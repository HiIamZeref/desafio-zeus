import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SettingsScreen({ navigation }) {
  return (
    <View>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        SettingsScreen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
