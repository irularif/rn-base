import { useNavigation, useTheme } from "@react-navigation/native";
import AppConfig from "app/config/app";
import SessionStore from "app/model/session";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import {
  Button,
  Field,
  Form,
  Image,
  Screen,
  ScrollView,
  Text,
  TextInput,
  View,
} from "libs/ui";
import { shadeColor } from "libs/utils/color";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import * as Yup from "yup";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme: ITheme = useTheme() as ITheme;

  return (
    <Screen
      style={{
        backgroundColor: "#fff",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#00000000",
      }}
    >
      <ScrollView>
        <View
          style={{
            margin: 15,
            marginTop: 30,
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
            }}
          >
            <Image
              source={require("app/assets/images/splash.png")}
              style={{
                height: 100,
                width: 120,
              }}
            />
            <Text
              style={{
                lineHeight: 32,
                fontSize: 23,
                fontFamily: Fonts.NunitoBold,
                color: Theme.colors.primary,
              }}
            >
              Base React Native Project
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              marginVertical: 20,
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                height: (1 / 2) * (dim.width - 40),
                width: dim.width - 40,
              }}
              source={require("app/assets/images/business_deal.png")}
            />
          </View>
          <View
            style={{
              borderRadius: 14,
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            {AppConfig.mode !== "production" && (
              <Text
                style={{
                  lineHeight: 26,
                  fontSize: 26,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                Development
              </Text>
            )}
            <Form
              values={SessionStore}
              validationSchema={{
                username: Yup.string().required("Harus diisi"),
                password: Yup.string().required("Harus diisi"),
              }}
              onSubmit={() => SessionStore.exampleLogin()}
              Submit={(handleSubmit, canSubmit) => (
                <RenderSubmit
                  handleSubmit={handleSubmit}
                  canSubmit={canSubmit}
                />
              )}
            >
              {(props) => (
                <>
                  <Field
                    initializeField={props}
                    label={"Username"}
                    path={"username"}
                  >
                    <TextInput type={"text"}></TextInput>
                  </Field>
                  <Field
                    initializeField={props}
                    label={"Password"}
                    path={"password"}
                  >
                    <TextInput type={"password"}></TextInput>
                  </Field>
                </>
              )}
            </Form>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});

const RenderSubmit = observer((props: any) => {
  const { handleSubmit, canSubmit } = props;
  const nav = useNavigation();
  const Theme: ITheme = useTheme() as any;

  return (
    <>
      <Button
        style={{
          alignSelf: "flex-end",
          paddingHorizontal: 10,
          minHeight: 30,
          height: 30,
          backgroundColor: shadeColor(Theme.colors.primary, 200),
        }}
        onPress={() => {
          nav.navigate("guest/MediaWebView", {
            data: {
              title: "Lupa kata sandi",
              source: {
                uri: AppConfig.serverUrl + "index.php?r=site/reqPass",
              },
              style: {
                padding: 15,
              },
            },
          });
        }}
      >
        <Text
          style={{
            color: Theme.colors.primary,
          }}
        >
          Lupa kata sandi?
        </Text>
      </Button>
      <Button
        style={{
          margin: 0,
          marginTop: 15,
          paddingVertical: 12,
        }}
        onPress={handleSubmit}
        disabled={!canSubmit || SessionStore.loading}
      >
        <Text
          style={{
            color: Theme.colors.textLight,
            fontSize: 16,
            fontFamily: Fonts.NunitoBold,
          }}
        >
          {SessionStore.loading ? "Loading..." : "Masuk"}
        </Text>
      </Button>
    </>
  );
});
