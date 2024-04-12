import { StyleSheet, Text, View } from "react-native";
import React from "react";
import defaultStyles from "../../themes/styles";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={defaultStyles.mainView}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        DetailsScreen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
