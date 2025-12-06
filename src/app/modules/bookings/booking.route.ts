import express from "express";

import { bookingController } from "./booking.controller";
import auth, { USER_ROLE } from "../../middleware/auth";

const bookingRouter = express.Router();

bookingRouter.post("/", bookingController.addBooking);
bookingRouter.get("/", bookingController.getAllBooking);
bookingRouter.put(
  "/:bookingId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  bookingController.updateBooking
);

export default bookingRouter;
