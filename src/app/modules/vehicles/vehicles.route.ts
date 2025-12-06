import express from "express";
import { vehicleController } from "./vehicles.controller";
import auth, { USER_ROLE } from "../../middleware/auth";

const vehicleRouter = express.Router();

vehicleRouter.post("/", auth(USER_ROLE.admin), vehicleController.addNewVehicle);
vehicleRouter.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  vehicleController.getAllVehicle
);
vehicleRouter.get(
  "/:vehicleId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  vehicleController.getSingleVehicle
);
vehicleRouter.put(
  "/:vehicleId",
  auth(USER_ROLE.admin),
  vehicleController.updateSingleVehicle
);
vehicleRouter.delete(
  "/:vehicleId",
  auth(USER_ROLE.admin),
  vehicleController.deleteSingleVehicle
);

export default vehicleRouter;
