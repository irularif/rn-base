import { useNavigation, useTheme } from "@react-navigation/native";
import GlobalStore from "app/model/global";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import { Text, TopBar } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";

interface ITopBar {
  title?: string;
  backButton?: boolean;
  actionBackButton?: () => void;
}

export default observer(({ title, backButton, actionBackButton }: ITopBar) => {
  const nav = useNavigation();
  const Theme: ITheme = useTheme() as any;

  return (
    <TopBar
      enableShadow={false}
      style={{
        paddingHorizontal: !!backButton ? 0 : 15,
      }}
      backButton
      actionBackButton={actionBackButton}
    >
      <Text
        style={{
          color: Theme.colors.textLight,
          fontSize: 20,
          fontFamily: Fonts.NunitoBold,
          flexGrow: 1,
        }}
      >
        {title || GlobalStore.activeMenu.label}
      </Text>
    </TopBar>
  );
});
