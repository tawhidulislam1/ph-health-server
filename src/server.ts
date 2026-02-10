import app from "./app";
import { envVars } from "./config/env";

const bootstrap = () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`server is running on ${envVars.PORT}`);
    });
  } catch (error) {
    console.log("Failed To Start Server");
  }
};

bootstrap();
