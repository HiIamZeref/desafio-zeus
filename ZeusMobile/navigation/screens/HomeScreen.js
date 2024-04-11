import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainView}>
      <View style={styles.content}>
        <Text
          onPress={() => console.log("HomeScreen")}
          style={{ fontSize: 26, fontWeight: "bold" }}
        >
          HomeScreen
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
