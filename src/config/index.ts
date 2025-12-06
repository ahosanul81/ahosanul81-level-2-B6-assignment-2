import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  connectionStr: process.env.CONNECTION_STR,
  jwtSecret: process.env.JWTSECRET,
};
