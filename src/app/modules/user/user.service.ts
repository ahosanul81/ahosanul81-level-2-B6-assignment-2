import { pool } from "../../../config/db";
import { IUser } from "./user.interface";

const getAllUserFromDB = async () => {
  const result = await pool.query(
    `SELECT name, email, phone, role FROM users`,
    []
  );
  return result.rows;
};
const updateSingleUserFromDB = async (userId: string, payload: IUser) => {
  const { email, name, password, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users SET email=$2, name=$3, password=$4, phone=$5, role=$6 WHERE id= $1`,
    [userId, email, name, password, phone, role]
  );
  if (result.rowCount && result.rowCount < 1) {
    throw new Error("user not updated");
  }
  return result;
};
const deleteSingleUserFromDB = async (userId: string) => {
  const isExistUser = await pool.query(`SELECT * FROM users WHERE id= $1`, [
    userId,
  ]);
  if (!isExistUser.rows.length) {
    throw new Error("Target user not found");
  }
  const hasActiveBookingUser = await pool.query(
    `SELECT status FROM bookings WHERE customer_id= $1`,
    [userId]
  );
  if (hasActiveBookingUser.rows[0].status === "active") {
    throw new Error("User has active booking , can not be deleted");
  }
  const hasActiveBookingVehicle = await pool.query(
    `SELECT status FROM bookings WHERE vehicle_id= $1`,
    [userId]
  );
  if (hasActiveBookingVehicle.rows[0].status === "active") {
    throw new Error("Vehicle has active booking , can not be deleted");
  }
  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1;
    `,
    [userId]
  );
  console.log(result);
  if (result.rowCount && result.rowCount < 1) {
    throw new Error("user has not deleted");
  }
};

export const userService = {
  getAllUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
};
