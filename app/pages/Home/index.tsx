import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import Tab from "app/pages/Home/Tab";
import { TabInitialStack, TabRoutes } from "app/routes/tabs";
import { IRoute } from "libs/routes";
import { ITheme } from "libs/config/theme";
import { useTheme } from "@react-navigation/native";

const NavigationTab = createBottomTabNavigator();

export default observer(() => {
  const Theme: ITheme = useTheme() as any;
  return (
    <Screen
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: Theme.colors.card,
      }}
    >
      <NavigationTab.Navigator
        {...TabInitialStack}
        tabBar={(props) => <Tab {...props} />}
        lazy={true}
        sceneContainerStyle={{
          backgroundColor: Theme.colors.card,
        }}
      >
        {TabRoutes.map(
          (item: IRoute) =>
            !!item.component && (
              <NavigationTab.Screen
                key={item.name}
                name={item.name}
                component={item.component}
              />
            )
        )}
      </NavigationTab.Navigator>
    </Screen>
  );
});
