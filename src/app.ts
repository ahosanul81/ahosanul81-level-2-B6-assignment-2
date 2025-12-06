import express from "express";
import userRouter from "./app/modules/user/user.route";
import authRouter from "./app/modules/auth/auth.route";
import vehicleRouter from "./app/modules/vehicles/vehicles.route";
import bookingRouter from "./app/modules/bookings/booking.route";
const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("vehicle rental server is running !");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/bookings", bookingRouter);
export default app;
