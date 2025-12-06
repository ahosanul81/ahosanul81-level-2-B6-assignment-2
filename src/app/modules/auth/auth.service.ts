import config from "../../../config";
import { pool } from "../../../config/db";
import { ISignIn, ISignUp } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUpIntoDB = async (payload: ISignUp) => {
  const { name, email, password, phone, role } = payload;
  const hashedPass = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users( name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPass, phone, role]
  );
  return result;
};

const signInFromDB = async (payload: ISignIn) => {
  const { email, password } = payload;
  const result = await pool.query(`SELECT * FROM users WHERE email=$1 `, [
    email.toLowerCase(),
  ]);

  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    user: {
      name: result.rows[0].name,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
      role: result.rows[0].role,
    },
  };
};

export const authService = { signUpIntoDB, signInFromDB };
