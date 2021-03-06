import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const GoUpButton = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <AntDesign
        style={styles.button}
        name="upcircleo"
        size={35}
        color="rgba(62, 62, 62, 0.8)"
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: "90%",
    alignSelf: "center",
    borderRadius: 35 / 2,
  },
});
