import { Modal, Spinner, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";

interface ILoading {
  loading: boolean;
  message?: string;
}

export default observer((props: ILoading) => {
  const { loading, message } = props;

  if (!loading) return null;

  return (
    <Modal visible={loading}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "#0006",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            overflow: "hidden",
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size="large" />
          {!!message && (
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 16,
              }}
            >
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
});
