import { IRoute, TStackProps } from "libs/routes";

// Navigation Tab
export const TabInitialStack: TStackProps = {
  initialRouteName: "Dashboard",
  headerMode: "none",
};

export const TabRoutes: IRoute[] = [
  {
    title: "Dashboard",
    name: "Dashboard",
    icon: { name: "pie-chart" },
    component: require("app/pages/Dashboard").default,
    roles: [],
  },
  {
    title: "Pengaturan",
    name: "Setting",
    icon: { name: "md-settings" },
    roles: [],
  },
];
