import { useNavigation, useTheme } from "@react-navigation/native";
import GlobalStore from "app/model/global";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import { Button, Icon, Text, TopBar } from "libs/ui";
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
        backgroundColor: Theme.colors.card,
        paddingHorizontal: !!backButton ? 0 : 15,
      }}
    >
      {!!backButton && (
        <Button
          mode="clean"
          style={{
            paddingHorizontal: 0,
            paddingVertical: 5,
            borderRadius: 0,
          }}
          onPress={() => {
            if (!!actionBackButton) {
              actionBackButton();
            } else {
              nav.goBack();
            }
          }}
        >
          <Icon name="md-arrow-back" size={28} color={Theme.colors.primary} />
        </Button>
      )}
      <Text
        style={{
          color: Theme.colors.primary,
          fontSize: 24,
          fontFamily: Fonts.NunitoBold,
          flexGrow: 1,
        }}
      >
        {title || GlobalStore.activeMenu.label}
      </Text>
    </TopBar>
  );
});
