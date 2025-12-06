import express from "express";
import { userController } from "./user.controller";
import auth, { USER_ROLE } from "../../middleware/auth";
const userRouter = express.Router();

userRouter.get("/", auth(USER_ROLE.admin), userController.getAllUsers);
userRouter.put("/:userId", userController.updateSingleUser);
userRouter.delete(
  "/:userId",
  auth(USER_ROLE.admin),
  userController.deleteSingleUser
);

export default userRouter;
