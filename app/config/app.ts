import { TMode } from "libs/config/app";

const mode: TMode = "dev"; // production

const AppConfig = {
  mode,
  serverUrl:
    mode === "production" ? "http://localhost/api/" : "http://localhost/api/",
  // "http://f578c0915a5c.ngrok.io/api/",
  appRoles: [] as string[],
};

export default AppConfig;
