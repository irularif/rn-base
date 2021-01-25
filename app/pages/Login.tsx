import { useNavigation, useTheme } from "@react-navigation/native";
import SessionStore from "app/model/session";
import Fonts from "libs/assets/fonts";
import config from "libs/config/app";
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
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import * as Yup from "yup";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme: ITheme = useTheme() as any;

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
            padding: 15,
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flexGrow: 1,
                marginVertical: 20,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("app/assets/images/login-image.png")}
                style={{
                  height: 200,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 20,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("app/assets/images/logo-sekolah.png")}
                style={{
                  height: 80,
                  width: 80,
                }}
              />
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.NunitoExtraBold,
                    fontSize: 24,
                    lineHeight: 26,
                  }}
                >
                  SIAKAD
                </Text>
                <Text
                  style={{
                    color: Theme.colors.primary,
                    fontFamily: Fonts.NunitoExtraBold,
                    fontSize: 24,
                    lineHeight: 26,
                  }}
                >
                  KHADIJAH 2
                </Text>
                <Text
                  style={{
                    color: Theme.colors.primary,
                    lineHeight: 16,
                  }}
                >
                  Darmo Permai
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: 14,
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            {config.mode !== "production" && (
              <Text
                style={{
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
              onSubmit={() => SessionStore.login()}
              Submit={(handleSubmit, canSubmit) => (
                <RenderSubmit
                  handleSubmit={handleSubmit}
                  canSubmit={canSubmit}
                />
              )}
            >
              {(props) => {
                return (
                  <>
                    <Field
                      initializeField={props}
                      label="NIS"
                      path="username"
                      styles={{
                        inputWrapper: {
                          borderWidth: 0,
                          backgroundColor: "#E1F5EA",
                          borderRadius: 6,
                        },
                        label: {
                          color: Theme.colors.primary,
                          fontFamily: Fonts.NunitoBold,
                        },
                      }}
                    >
                      <TextInput type="text" />
                    </Field>
                    <Field
                      initializeField={props}
                      label="Kata Sandi"
                      path="password"
                      styles={{
                        inputWrapper: {
                          borderWidth: 0,
                          backgroundColor: "#E1F5EA",
                          borderRadius: 6,
                        },
                        label: {
                          color: Theme.colors.primary,
                          fontFamily: Fonts.NunitoBold,
                        },
                      }}
                    >
                      <TextInput type="password" />
                    </Field>
                    <Button
                      mode="clean"
                      style={{
                        alignSelf: "flex-end",
                        paddingHorizontal: 10,
                        minHeight: 30,
                        height: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: Theme.colors.primary,
                          fontFamily: Fonts.NunitoBold,
                          textDecorationLine: "underline",
                        }}
                      >
                        Lupa kata sandi?
                      </Text>
                    </Button>
                  </>
                );
              }}
            </Form>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});

const RenderSubmit = observer((props: any) => {
  const { handleSubmit, canSubmit } = props;
  const Theme: ITheme = useTheme() as any;
  return (
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
  );
});
