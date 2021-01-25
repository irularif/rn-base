import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import DashboardStore from "app/model/dashboard";
import Header from "app/ui/dashboard/Header";
import { ScrollView, View } from "libs/ui";
import { statusBarHeight } from "libs/ui/Screen";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions, RefreshControl } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const refresh = () => {
    DashboardStore.load();
  };

  const refreshControl = (
    <RefreshControl refreshing={DashboardStore.loading} onRefresh={refresh} />
  );

  useEffect(() => {
    if (!!isFocused) {
      refresh();
    }
  }, [isFocused]);

  return (
    <>
      <ScrollView refreshControl={refreshControl}>
        <View
          style={{
            marginTop: 15 + statusBarHeight,
            marginBottom: 90,
          }}
        >
          <Header />
        </View>
      </ScrollView>
    </>
  );
});
