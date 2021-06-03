import { useTheme } from "@react-navigation/native";
import { ITheme } from "libs/config/theme";
import { Text, View } from "libs/ui";
import React from "react";

export default ({ label, value }: any) => {
  const Theme: ITheme = useTheme() as any;

  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontFamily: Theme.fontStyle.bold,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: Theme.fontSize.h4,
          paddingHorizontal: 10,
          color: Theme.colors.textSecondary,
        }}
      >
        {value || "-"}
      </Text>
    </View>
  );
};
