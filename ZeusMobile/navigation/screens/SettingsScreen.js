import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import defaultStyles from "../../themes/styles";
import { useState } from "react";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={defaultStyles.mainView}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={defaultStyles.mainText}
      >
        Ajustes
      </Text>
      <Pressable style={{ ...defaultStyles.insertPressable, width: 200 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Perfil
        </Text>
      </Pressable>
      <Pressable style={{ ...defaultStyles.insertPressable, width: 200 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Valores Padrão
        </Text>
      </Pressable>
      <Pressable style={{ ...defaultStyles.insertPressable, width: 200 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Sobre
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
