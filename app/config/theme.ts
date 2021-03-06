import { ITheme } from "libs/config/theme";

export const DefaultTheme: Partial<ITheme> = {
  colors: {
    primary: "#23A9CC",
    secondary: "#23A9CC",
    background: "#f3f3f3",
    card: "#ffffff",
    text: "#333333",
    textSecondary: "#555555",
    textLight: "#ffffff",
    border: "#C7C7CC",
    notification: "rgb(255, 69, 58)",
  },
  statusBar: {
    barStyle: "light-content",
    backgroundColor: "#23A9CC",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
};

export const DarkTheme: Partial<ITheme> = {};
