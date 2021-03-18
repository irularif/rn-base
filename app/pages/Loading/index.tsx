import { Image, Screen, Spinner, Text, View } from "libs/ui";
import React from "react";
import { Dimensions } from "react-native";

export default (props: any) => {
  const dim = Dimensions.get("window");
  let message = props.syncMessage;
  let progress = "";
  if (!!props.progress) {
    let dl = (props.progress.receivedBytes / props.progress.totalBytes) * 100;
    progress = `(${dl.toFixed(1)}%)`;
  }

  return (
    <Screen
      style={{
        backgroundColor: "#fff",
      }}
      statusBar={{
        backgroundColor: "#ffffff",
        barStyle: "dark-content",
      }}
    >
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        type={"View"}
      >
        <Image
          source={require("app/assets/images/splash.png")}
          style={{
            width: dim.width,
            height: dim.width,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
          }}
        >
          {!!message && (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 15,
              }}
            >
              <Spinner color={"#2A824F"}></Spinner>

              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 10,
                }}
              >
                {message}
                {progress}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
};
