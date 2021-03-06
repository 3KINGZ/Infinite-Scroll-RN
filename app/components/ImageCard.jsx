import React from "react";
import { Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const ImageCard = ({ imageDetail }) => {
  const navigation = useNavigation();

  const { download_url: image } = imageDetail;

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Detail", { imageDetail })}
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "33.3%",
    height: 100,
  },
});
