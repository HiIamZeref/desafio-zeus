import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import defaultStyles from "../../themes/styles";
import { useState } from "react";
import { getGastosMesTotal } from "../../services/Api.js";
import { useFocusEffect } from "@react-navigation/native";

export default function DetailsScreen({ navigation }) {
  const [meses, setMeses] = useState({
    Janeiro: 100,
    Fevereiro: 200,
    Março: 300,
    Abril: 400,
    Maio: 500,
    Junho: 600,
    Julho: 700,
    Agosto: 800,
    Setembro: 900,
    Outubro: 1000,
    Novembro: 1100,
    Dezembro: 1200,
  });

  const atualizarGastosMensais = function () {
    // console.log("Atualizando gastos mensais...");
    getGastosMesTotal().then((response) => {
      const responseData = response.data;
      // console.log("Gastos mensais recebidos: ", responseData);
      Object.keys(responseData).forEach((key) => {
        setMeses((prevMeses) => ({ ...prevMeses, [key]: responseData[key] }));
      });
    });
    console.log("Gastos mensais atualizados: ", meses);
  };

  // useEffect(() => {
  //   atualizarGastosMensais();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Entrando em DetailsScreen.");
      atualizarGastosMensais();
      return () => {
        console.log("Saindo de DetailsScreen.");
      };
    }, [])
  );
  return (
    <View style={defaultStyles.mainView}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={defaultStyles.mainText}
      >
        Gastos Mensais de {new Date().getFullYear()}:
      </Text>

      <FlatList
        data={Object.keys(meses)}
        renderItem={({ item }) => (
          <View style={{ ...defaultStyles.gastosContainer, width: 300 }}>
            <Text style={defaultStyles.textoGastosContainer}>{item}:</Text>
            <Text style={defaultStyles.gastosText}>R$ {meses[item]}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});
