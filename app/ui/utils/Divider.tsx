import { useTheme } from "@react-navigation/native";
import { ITheme } from "libs/config/theme";
import { Text } from "libs/ui";
import React from "react";

export default ({ title }: any) => {
  const Theme: ITheme = useTheme() as any;

  return (
    <Text
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Theme.colors.card,
        fontFamily: Theme.fontStyle.bold,
        fontSize: Theme.fontSize.h5,
        borderBottomWidth: 1,
        borderColor: Theme.colors.border,
      }}
    >
      {title}
    </Text>
  );
};
