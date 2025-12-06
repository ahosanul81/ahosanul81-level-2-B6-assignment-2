import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();

    res.status(200).json({
      success: false,
      message: "Users retrieved successfully",
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
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateSingleUserFromDB(
      req.params.userId as string,
      req.body
    );

    res.status(200).json({
      success: false,
      message: "Update user Successfully",
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
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteSingleUserFromDB(
      req.params.userId as string
    );

    res.status(200).json({
      success: false,
      message: "Delete user Successfully",
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
export const userController = {
  getAllUsers,
  updateSingleUser,
  deleteSingleUser,
};
