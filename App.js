import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Home from "./Screens/Home";
import AddContactScreen from "./Screens/AddContactScreen";
import EditContactScreen from "./Screens/EditContactScreen";
import ViewContactScreen from "./Screens/ViewContactScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#b83227" },
          headerTitleStyle: { color: "#fff" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="AddContactScreen"
          component={AddContactScreen}
          options={{ title: "Add Contact" }}
        />
        <Stack.Screen
          name="EditContactScreen"
          component={EditContactScreen}
          options={{ title: "Edit Contact" }}
        />
        <Stack.Screen
          name="ViewContactScreen"
          component={ViewContactScreen}
          options={{ title: "View Contact" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
