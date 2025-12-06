import { pool } from "../../../config/db";
import { IVehicle } from "./vehicles.interface";

const addNewVehicleIntoDB = async (payload: IVehicle) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        INSERT INTO vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};
const getAllVehicleFromDB = async () => {
  const result = await pool.query(`
            SELECT * from vehicles 
        `);
  if (result.rowCount && result.rowCount < 1) {
    throw new Error("No vehicles found");
  }
  return result.rows.length > 0 ? result.rows : [];
};
const getSingleVehicleFromDB = async (vehicleId: string) => {
  const result = await pool.query(
    `
            SELECT * from vehicles WHERE id=$1
        `,
    [vehicleId]
  );
  if (result.rowCount && result.rowCount < 1) {
    throw new Error("No vehicles found");
  }
  return result.rows[0];
};
const updateSingleVehicleFromDB = async (
  vehicleId: string,
  payload: IVehicle
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
      UPDATE vehicles
      SET 
        vehicle_name = $2,
        type = $3,
        registration_number = $4,
        daily_rent_price = $5,
        availability_status = $6
      WHERE id = $1
      RETURNING *;
    `,
    [
      vehicleId,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  if (result.rowCount && result.rowCount < 1) {
    throw new Error("No vehicles found");
  }
  return result.rows[0];
};
const deleteSingleVehicleFromDB = async (vehicleId: string) => {
  const isExistVehicle = await pool.query(
    `
      SELECT * FROM vehicles WHERE id=$1;
    `,
    [vehicleId]
  );

  if (isExistVehicle.rows.length === 0) {
    throw new Error("This vehicle is not exist");
  }
  const result = await pool.query(
    `
      DELETE FROM vehicles WHERE id=$1;
    `,
    [vehicleId]
  );
  if (result.rowCount && result.rowCount < 1) {
    throw new Error("Vehicle has not deleted");
  }
};
export const vehicleService = {
  addNewVehicleIntoDB,
  getAllVehicleFromDB,
  getSingleVehicleFromDB,
  updateSingleVehicleFromDB,
  deleteSingleVehicleFromDB,
};
