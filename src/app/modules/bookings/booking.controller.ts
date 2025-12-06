import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const addBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.addBookingIntoDB(req.body);

    res.status(200).json({
      success: false,
      message: "add booking Successfully",
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
const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookingIntoDB();

    res.status(200).json({
      success: false,
      message: "Update booking Successfully",
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
const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.updateBookingIntoDB(
      req.user as JwtPayload,
      req.params.bookingId as string,
      req.body
    );

    res.status(200).json({
      success: false,
      message: "Update booking Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
    });
  }
};

export const bookingController = { addBooking, getAllBooking, updateBooking };
