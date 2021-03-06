import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ImageProvider } from "./app/context/ImageContext";
import { Photos, PhotoDetail } from "./app/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ImageProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Photos} />
          <Stack.Screen name="Detail" component={PhotoDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageProvider>
  );
}
