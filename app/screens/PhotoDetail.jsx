import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export const PhotoDetail = ({ route, navigation }) => {
  const { imageDetail } = route.params;

  const { author, download_url } = imageDetail;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{ padding: 10 }}
            name="arrow-back"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        <Image
          source={{ uri: download_url }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{author}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  image: { width: "100%", height: "50%" },
  title: {
    color: "white",
    textAlign: "center",
    bottom: 80,
    fontSize: 24,
  },
});
