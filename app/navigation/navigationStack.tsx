import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Slider from "../screens/Slider";
import Details from "../screens/details";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Slider} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
