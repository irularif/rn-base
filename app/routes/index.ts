import { IRoute, TStackProps } from "libs/routes";

// Public Navigation
export const PublicInitialStack: TStackProps = {
  initialRouteName: "Login",
};

export const PublicRoutes: IRoute[] = [
  {
    name: "Login",
    component: require("app/pages/Login").default,
    roles: [],
  },
  {
    name: "MediaWebView",
    component: require("app/pages/MediaWebView").default,
    roles: [],
  },
];

// Private Navigation
export const PrivateInitialStack: TStackProps = {
  initialRouteName: "Home",
};

export const PrivateRoutes: IRoute[] = [
  {
    name: "Home",
    component: require("app/pages/Home").default,
    roles: [],
  },
  {
    title: "Pengaturan",
    name: "Setting",
    icon: { name: "md-settings" },
    component: require("app/pages/Setting").default,
    roles: [],
  },
  {
    name: "Profile",
    title: "Profil",
    component: require("app/pages/Profile").default,
    roles: [],
  },
];
