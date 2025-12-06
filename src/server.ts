import app from "./app";
import config from "./config";
import initDB from "./config/db";

async function main() {
  try {
    await initDB();
    app.listen(config.port, () => {
      console.log(`vehicle rental server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
