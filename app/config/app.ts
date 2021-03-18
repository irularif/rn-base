import { TMode } from "libs/config/app";

const mode: TMode = "dev"; // production

const AppConfig = {
  mode,
  serverUrl:
    mode === "production" ? "http://localhost/api/" : "http://localhost/api/",
  appRoles: [] as string[],
};

export default AppConfig;
