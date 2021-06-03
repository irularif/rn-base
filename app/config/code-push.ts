import { ICodePushConfig } from "libs/config/code-push";
import CodePush, { SyncOptions } from "react-native-code-push";
import AppConfig from "./app";

const CodepushConfig: ICodePushConfig = {
  deploymentKey: AppConfig.mode === "production" ? "" : "",
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
} as SyncOptions;

export default CodepushConfig;
