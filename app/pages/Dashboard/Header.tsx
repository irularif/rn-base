import SessionStore from "app/model/session";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Image, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const Theme = useTheme();
  const dim = Dimensions.get("window");

  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 22,
              fontFamily: Fonts.NunitoBold,
              color: Theme.colors.primary,
            }}
          >
            Hai, {SessionStore.user.nama}
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 22,
              fontFamily: Fonts.NunitoBold,
            }}
          >
            Selamat datang!
          </Text>
        </View>
        <Image
          source={require("app/assets/images/scholl.png")}
          style={{
            height: (1 / 2) * dim.width,
            width: "100%",
          }}
        />
      </View>
    </View>
  );
});
