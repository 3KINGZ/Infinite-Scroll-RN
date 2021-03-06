import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ImageContext from "../context/ImageContext";
import { ImageCard, GoUpButton } from "../components";

export const Photos = () => {
  const { state, dispatch } = useContext(ImageContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { loading, images, next, error } = state;
  const flatListRef = useRef();

  useEffect(() => {
    dispatch.getImages();
  }, []);

  const getMoreImages = () => {
    dispatch.getMoreImages(next);
  };

  const toTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  if (loading && !images.length) {
    return (
      <SafeAreaView>
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="skyblue"
        />
      </SafeAreaView>
    );
  }

  if (error && !images.length) {
    return (
      <SafeAreaView>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            An Error occurred While Fetching Images
          </Text>
          <Button title="GET Images" onPress={dispatch.getImages} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={images}
        numColumns={4}
        keyExtractor={(item) => String(item.id * Math.random())}
        renderItem={({ item }) => <ImageCard imageDetail={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={next ? getMoreImages : null}
        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
        ref={flatListRef}
      />
      {scrollPosition > 10 && <GoUpButton onPress={toTop} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    paddingTop: 50,
  },
  errorContainer: {
    padding: 10,
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 20,
  },
});
