import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import defaultStyles from "../../themes/styles";
import { useState } from "react";

export default function DetailsScreen({ navigation }) {
  const [meses, setMeses] = useState([
    { nome: "Janeiro", valor: 100.0 },
    { nome: "Fevereiro", valor: 200.0 },
    { nome: "Março", valor: 300.0 },
    { nome: "Abril", valor: 400.0 },
    { nome: "Maio", valor: 500.0 },
    { nome: "Junho", valor: 600.0 },
    { nome: "Julho", valor: 700.0 },
    { nome: "Agosto", valor: 800.0 },
    { nome: "Setembro", valor: 900.0 },
    { nome: "Outubro", valor: 1000.0 },
    { nome: "Novembro", valor: 1100.0 },
    { nome: "Dezembro", valor: 1200.0 },
  ]);

  return (
    <View style={defaultStyles.mainView}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={defaultStyles.mainText}
      >
        Gastos Mensais
      </Text>

      <FlatList
        data={meses}
        renderItem={({ item }) => (
          <View
            style={{ ...defaultStyles.gastosContainer, width: 300 }}
            // onPress={() => console.log("cliquei")}
          >
            <Text style={defaultStyles.textoGastosContainer}>{item.nome}:</Text>
            <Text style={defaultStyles.gastosText}>R$ {item.valor}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});
