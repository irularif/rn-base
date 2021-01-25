import { useIsFocused, useNavigation } from "@react-navigation/native";
import GlobalStore from "app/model/global";
import SessionStore from "app/model/session";
import { TabRoutes } from "app/routes/tabs";
import Theme from "libs/config/theme";
import { IRoute } from "libs/routes";
import { Button, Icon, Text, View } from "libs/ui";
import { action, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export default observer(({ state, navigation }: any) => {
  const dim = Dimensions.get("window");
  const isFocused = useIsFocused();
  const meta = useLocalObservable(() => ({
    top: 0 as any,
    backgroundColor: "rgba(0,0,0,0)",
    expandMenu: false,
    menuList: [] as any,
    activeMenu: {
      label: "",
      path: "",
    },
  }));
  const expandMenu = meta.expandMenu;
  let baseStyle: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: !!expandMenu ? 14 : 999,
    margin: !!expandMenu ? 5 : 0,
    backgroundColor: "transparent",
    height: !!expandMenu ? (dim.width - (50 + 10 * 3)) / 3 : 50,
    width: !!expandMenu ? (dim.width - (50 + 10 * 3)) / 3 : 50,
    flexDirection: "column",
    paddingHorizontal: 0,
  };

  const filterRole = (x: IRoute) => {
    if (x.roles.length === 0) return true;
    let role = SessionStore.AuthContext.role;
    return x.roles.indexOf(role) > -1;
  };

  useEffect(() => {
    if (!!isFocused) {
      const menu = TabRoutes.filter(filterRole);
      let activeRoute = state.routes[state.index];
      let currentMenu = menu.find((x) => x.name === activeRoute.name);
      let cmenu = menu;
      if (!expandMenu && cmenu.length > 5) {
        cmenu = cmenu.slice(0, 5);
      }
      let actMenu: any = menu.find(
        (x) => !!currentMenu && x.name === currentMenu.name
      );
      const exMenu = cmenu.find(
        (x) => !!currentMenu && x.name === currentMenu.name
      );
      if (!exMenu && !expandMenu) {
        cmenu[cmenu.length - 1] = actMenu;
      }
      const path = currentMenu?.name || "";
      const title = currentMenu?.title || "";
      runInAction(() => {
        meta.menuList = cmenu;
        GlobalStore.activeMenu = {
          label: title || path,
          path,
        };
      });
      if (!!expandMenu) {
        runInAction(() => {
          meta.top = 0;
          meta.backgroundColor = "rgba(0,0,0,0.3)";
        });
      } else {
        runInAction(() => {
          meta.backgroundColor = "rgba(0,0,0,0)";
          meta.top = undefined;
        });
      }
    }
  }, [expandMenu, isFocused, state]);

  useEffect(() => {
    if (state.index > -1) {
      const menu = TabRoutes.filter(filterRole);
      let activeRoute = state.routes[state.index];
      let currentMenu = menu.find((x) => x.name === activeRoute.name);
      if (!currentMenu || !currentMenu.name) {
        currentMenu = menu[0];
        navigation.jumpTo(currentMenu.name);
      }
      runInAction(() => {
        if (!!currentMenu) {
          GlobalStore.activeMenu = {
            label: currentMenu.title || currentMenu.name,
            path: currentMenu.name,
          };
        }
      });
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        top: meta.top,
        justifyContent: "flex-end",
        backgroundColor: meta.backgroundColor,
        height: !!expandMenu ? "100%" : undefined,
        padding: 15,
      }}
      onPress={
        !!expandMenu
          ? action(() => {
              meta.expandMenu = !expandMenu;
            })
          : undefined
      }
      activeOpacity={1}
    >
      <View
        style={{
          backgroundColor: Theme.UIColors.primary,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          borderRadius: !!expandMenu ? 12 : 999,
          overflow: "hidden",
          paddingHorizontal: 5,
          paddingVertical: 5,
          justifyContent: !!expandMenu ? "flex-start" : "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <RenderMenu meta={meta} state={state} baseStyle={baseStyle} />
        {/* <Button
          mode="clean"
          style={baseStyle}
          onPress={() =>
            runInAction(() => {
              meta.expandMenu = !expandMenu;
            })
          }
        >
          <Icon
            name={!!expandMenu ? "ios-close" : "ios-menu"}
            size={!!expandMenu ? 22 * 1.5 : 22}
            style={{
              margin: 0,
            }}
            color={"#555"}
          />
          {!!expandMenu && (
            <Text
              style={{
                fontSize: 14,
                color: "#555",
                textAlign: "center",
              }}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >
              Minimize
            </Text>
          )}
        </Button> */}
      </View>
    </TouchableOpacity>
  );
});

const RenderMenu = observer((props: any) => {
  const { meta, state, baseStyle } = props;
  const nav = useNavigation();
  const expandMenu = meta.expandMenu;

  return (
    <>
      {meta.menuList.map((item: IRoute, key: number) => {
        if (!item) return null;
        const active = state.routes[state.index].name === item.name;
        let actStyle: ViewStyle = {
          backgroundColor: !!active ? Theme.UIColors.secondary : "transparent",
        };
        const RenderIcon = () => {
          const icon: any = item.icon;
          if (!!icon) {
            if (typeof icon === "object") {
              return (
                <Icon
                  {...icon}
                  name={icon.name}
                  size={
                    !!expandMenu
                      ? Number(icon.size || 0) * 1.5
                      : Number(icon.size || 0)
                  }
                  style={{
                    margin: 0,
                  }}
                  color="#fff"
                />
              );
            }
          } else {
            return icon;
          }

          return null;
        };
        const RenderTitle = () => {
          if (!!expandMenu) {
            return (
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  textAlign: "center",
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.title}
              </Text>
            );
          }
          return null;
        };
        return (
          <Button
            key={String(key)}
            mode="clean"
            style={StyleSheet.flatten([baseStyle, actStyle])}
            onPress={action(() => {
              nav.navigate(item.name);
              if (!!expandMenu) meta.expandMenu = !expandMenu;
            })}
          >
            <RenderIcon />
            <RenderTitle />
          </Button>
        );
      })}
    </>
  );
});
