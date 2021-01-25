import { useNavigation, useTheme } from "@react-navigation/native";
import SessionStore from "app/model/session";
import { ITheme } from "libs/config/theme";
import { Button, Icon, Image, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const Theme: ITheme = useTheme() as ITheme;

  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <Image
        source={require("app/assets/images/setting.png")}
        style={{
          height: (1 / 2) * dim.width,
          width: "100%",
        }}
      />
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          margin: 10,
          backgroundColor: Theme.colors.card,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: Theme.colors.border,
          overflow: "hidden",
        }}
      >
        <Image
          source={require("app/assets/images/profile.png")}
          style={{
            height: 90,
            width: 90,
            marginRight: 20,
            borderRadius: 999,
            overflow: "hidden",
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: Theme.fontSize.h4,
              fontFamily: Theme.fontStyle.bold,
              color: Theme.colors.primary,
              marginBottom: 10,
            }}
          >
            {SessionStore.user.nama}
          </Text>
        </View>
        <Button
          mode="clean"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            margin: 0,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          onPress={() => nav.navigate("Profile")}
        >
          <Icon name="md-create" color={Theme.colors.textSecondary} size={30} />
        </Button>
      </View>
    </View>
  );
});
