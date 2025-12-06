import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../../config/db";
import { IBooking } from "./booking.interface";

const addBookingIntoDB = async (payload: IBooking) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } =
    payload;

  const isExistVehecle = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );
  if (isExistVehecle.rowCount === 0) {
    throw new Error("Invalid vehicle id ");
  }
  if (isExistVehecle.rows[0].availability_status === "booked") {
    throw new Error("This vehicle is booked");
  }
  //   if (new Date(isExistVehecle.rows[0].rent_end_date).getTime() < Date.now()) {
  //   }
  const rentDays =
    Math.ceil(
      new Date(rent_end_date).getTime() - new Date(rent_start_date).getTime()
    ) / 86400000;

  const total_price = rentDays * isExistVehecle.rows[0].daily_rent_price;

  payload.total_price = total_price;

  const result = await pool.query(
    `INSERT INTO bookings (customer_id,
vehicle_id,
rent_start_date,
rent_end_date,
total_price,
status) VALUES( $1,$2,$3,$4,$5,$6)  RETURNING * `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  await pool.query(`UPDATE vehicles SET availability_status=$2 WHERE id = $1`, [
    vehicle_id,
    "booked",
  ]);
  return result.rows[0];
};
const getAllBookingIntoDB = async () => {
  const result = await pool.query(`SELECT * FROM bookings`, []);
  return result.rows;
};
const updateBookingIntoDB = async (
  userInfo: JwtPayload,
  bookingId: string,
  payload: IBooking
) => {
  //   console.log(bookingId);
  const { status } = payload;

  const isExistUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    userInfo.email,
  ]);
  if (!isExistUser.rows[0]) {
    throw new Error("User not found");
  }
  const bookingInfo = await pool.query(
    `SELECT vehicle_id FROM bookings WHERE id=$1`,
    [bookingId]
  );

  let updatedBookingStatus;
  if (isExistUser.rows[0].role === "customer" && status === "cancelled") {
    updatedBookingStatus = await pool.query(
      `UPDATE bookings SET status=$2  WHERE id = $1`,
      [bookingId, status]
    );
  }
  if (isExistUser.rows[0].role === "admin" && status === "returned") {
    updatedBookingStatus = await pool.query(
      `UPDATE bookings SET status=$2  WHERE id = $1`,
      [bookingId, status]
    );
  }
  if (updatedBookingStatus?.rowCount === 0) {
    throw new Error("status update failed");
  }
  const upadateVehicle = await pool.query(
    `UPDATE vehicles SET availability_status=$2 WHERE id = $1`,
    [bookingInfo?.rows[0].vehicle_id, "available"]
  );
  if (upadateVehicle.rowCount !== 1) {
    throw new Error("Update failed");
  }
  const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    bookingId,
  ]);
  return result.rows[0];
};

export const bookingService = {
  addBookingIntoDB,
  getAllBookingIntoDB,
  updateBookingIntoDB,
};
