import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const addNewVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.addNewVehicleIntoDB(req.body);

    res.status(200).json({
      success: false,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getAllVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicleFromDB();

    res.status(200).json({
      success: false,
      message: "Vehicles retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getSingleVehicleFromDB(
      req.params.vehicleId as string
    );

    res.status(200).json({
      success: false,
      message: "Vehicle retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updateSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.updateSingleVehicleFromDB(
      req.params.vehicleId as string,
      req.body
    );

    res.status(200).json({
      success: false,
      message: "get specific vehicle Successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.deleteSingleVehicleFromDB(
      req.params.vehicleId as string
    );

    res.status(200).json({
      success: false,
      message: "delete a vehicle Successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const vehicleController = {
  addNewVehicle,
  getAllVehicle,
  getSingleVehicle,
  updateSingleVehicle,
  deleteSingleVehicle,
};
