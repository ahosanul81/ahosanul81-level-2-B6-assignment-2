// higher order function  return korbe function k

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";
export type TUserRole = keyof typeof USER_ROLE;
export const USER_ROLE = {
  admin: "admin",
  customer: "customer",
} as const;

// roles = ["admin", "user"]
const auth = (...roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(500).json({ message: "You are not allowed!!" });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      const isExistUser = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [decoded.email]
      );

      if (!isExistUser.rows.length) {
        throw new Error("token user not found ");
      }
      if (
        decoded &&
        roles?.length &&
        !roles?.includes(decoded?.role as TUserRole)
      ) {
        return res.status(401).json({
          error: "unauthorized!!!",
        });
      }

      if (isExistUser.rows[0]?.role !== decoded?.role) {
        return res.status(403).json({
          error: "Forbidden",
        });
      }
      req.user = decoded as JwtPayload;

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
