import { Request, Response } from "express";
import { authService } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpIntoDB(req.body);

    res.status(200).json({
      success: false,
      message: "Signed up Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const signIn = async (req: Request, res: Response) => {
  try {
    const result = await authService.signInFromDB(req.body);

    res.status(200).json({
      success: false,
      message: "Login successful",
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
export const authController = { signUp, signIn };
