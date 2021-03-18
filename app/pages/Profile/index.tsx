import {
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import SessionStore from "app/model/session";
import TopBar from "app/ui/utils/TopBar";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import {
  Button,
  ChoiceGroup,
  DateTime,
  Field,
  Form,
  Screen,
  ScrollView,
  Text,
  TextInput,
  View,
} from "libs/ui";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import * as Yup from "yup";

export default observer(({ state }: any) => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const Theme: ITheme = useTheme() as any;

  const submit = async () => {
    const res = await SessionStore.form.save();
    if (!!res) {
      SessionStore.initForm();
      nav.goBack();
    }
  };

  const SignupSchema = {
    nama: Yup.string().required("Harus diisi"),
    tmptLahir: Yup.string().required("Harus diisi"),
    jenisKelamin: Yup.string().required("Harus diisi"),
    alamat: Yup.string().required("Harus diisi"),
    email: Yup.string().email("Email tidak sesuai"),
  };
  const jenisKelamin = [
    {
      value: "P",
      label: "Perempuan",
    },
    {
      value: "L",
      label: "Laki-Laki",
    },
  ];

  useEffect(() => {
    SessionStore.initForm();
  }, []);

  return (
    <Screen>
      <TopBar backButton title="Profile" />
      <ScrollView>
        <View
          style={{
            margin: 15,
            flex: 1,
          }}
        >
          <Form
            values={SessionStore.form}
            validationSchema={SignupSchema}
            onSubmit={submit}
            Submit={(handleSubmit, canSubmit) => (
              <RenderSubmit handleSubmit={handleSubmit} canSubmit={canSubmit} />
            )}
          >
            {(props) => {
              return (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Field initializeField={props} label="Nama *" path="name">
                    <TextInput type="text" />
                  </Field>
                  <Field
                    initializeField={props}
                    label="Tanggal Lahir"
                    path="tglLahir"
                  >
                    <DateTime type="date" />
                  </Field>
                  <Field
                    initializeField={props}
                    label="Tempat Lahir *"
                    path="tmptLahir"
                  >
                    <TextInput type="text" />
                  </Field>
                  <Field
                    initializeField={props}
                    label="Jenis Kelamin *"
                    path="jenisKelamin"
                  >
                    <ChoiceGroup
                      items={jenisKelamin}
                      labelPath="label"
                      style={{
                        flexDirection: "row",
                      }}
                    />
                  </Field>
                  <Field initializeField={props} label="Telp" path="telepon">
                    <TextInput type="number" />
                  </Field>
                  <Field initializeField={props} label="Email" path="email">
                    <TextInput type="text" />
                  </Field>
                  <Field initializeField={props} label="Alamat *" path="alamat">
                    <TextInput type="multiline" />
                  </Field>
                </View>
              );
            }}
          </Form>
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
      disabled={!canSubmit || SessionStore.form.saving}
    >
      <Text
        style={{
          color: Theme.colors.textLight,
          fontSize: 16,
          fontFamily: Fonts.NunitoBold,
        }}
      >
        {SessionStore.form.saving ? "Loading..." : "Simpan"}
      </Text>
    </Button>
  );
});
