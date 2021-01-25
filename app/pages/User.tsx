import Theme from "libs/config/theme";
import { Image, Screen, Spinner, Text, View } from "libs/ui";
import React from "react";
import { Dimensions } from "react-native";

export default () => {
  const dim = Dimensions.get("window");
  return (
    <Screen
      style={{
        backgroundColor: "#fff",
      }}
      statusBar={{
        backgroundColor: "white",
        barStyle: "dark-content",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        type={"View"}
      >
        <Image
          source={require("app/assets/images/splash.jpg")}
          style={{
            width: dim.width,
            height: dim.width / 2,
            marginBottom: 20,
          }}
        ></Image>
        <Spinner
          size={"large"}
          style={{
            alignSelf: "center",
          }}
          color={Theme.UIColors.primary}
        ></Spinner>
        <Text>User Screen</Text>
      </View>
    </Screen>
  );
};
