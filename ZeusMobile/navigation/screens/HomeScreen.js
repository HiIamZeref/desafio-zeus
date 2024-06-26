import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import defaultStyles from "../../themes/styles";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getGastos,
  getGastosMesAtual,
  getDefaultValues,
  postGasto,
} from "../../services/Api.js";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { format } from "date-fns";

export default function HomeScreen({ navigation }) {
  // State Setup (dados principais)
  const [metaGastoMensal, setMetaGastoMensal] = useState(100.25);
  const [gastoMesAtual, setMesAtual] = useState(500);

  // State Setup (últimas compras)
  const [ultimasCompras, setUltimasCompras] = useState([]);

  // State Setup (dados modal)
  const [valorGasto, setValorGasto] = useState(200.0);
  const [quantidadeComprada, setQuantidadeComprada] = useState(10.0);

  // Modal Setup
  const [modalVisible, setModalVisible] = useState(false);
  const transparent = "rgba(0, 0, 0, 0.5)";

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => setShowPicker(!showPicker);

  const atualizarUltimasCompras = function () {
    console.log("Atualizando últimas compras...");
    getGastos().then((response) => {
      const responseData = response.data;
      const dezUltimasCompras = responseData.slice(0, 10);
      console.log("Dez últimas compras: ", dezUltimasCompras);
      setUltimasCompras(dezUltimasCompras);
    });
  };

  const atualizarGastoMesAtual = function () {
    // console.log("Atualizando gasto mensal...");
    getGastosMesAtual().then((response) => {
      const { gastoMensalAtual } = response.data;
      console.log("Gasto mensal recebido: ", gastoMensalAtual);
      setMesAtual(gastoMensalAtual);
    });
  };

  const atualizarValoresDefault = function () {
    // console.log("Recebendo valores default...");
    getDefaultValues().then((response) => {
      const responseData = response.data[0];
      // console.log("Valores recebidos: ", responseData);
      setMetaGastoMensal(responseData.metaGastoMensal.toFixed(2));
      setValorGasto(responseData.dinheiroDefault);
      setQuantidadeComprada(responseData.quantidadeDefault);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("Entrando em HomeScreen.");
      atualizarGastoMesAtual();
      atualizarValoresDefault();
      atualizarUltimasCompras();

      return () => {
        console.log("Saindo de HomeScreen.");
      };
    }, [])
  );

  const onChangeDatePicker = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      console.log(currentDate);
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const renderDatePicker = () => {
    setShowPicker(true);
  };

  function renderModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            ...defaultStyles.content,
            backgroundColor: transparent,
            justifyContent: "center",
          }}
        >
          <View style={defaultStyles.modalView}>
            {/* Date Picker */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Data da compra:
            </Text>
            <Pressable onPress={renderDatePicker}>
              <Text style={defaultStyles.defaultDatePickerInput}>
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={date}
                dateFormat="day month year"
                maximumDate={new Date()}
                minimumDate={new Date(2020, 0, 0)}
                onChange={onChangeDatePicker}
              />
            )}
            {/* Input valor */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Valor gasto (R$):
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
                style={{ textAlign: "center", width: "100%" }}
                keyboardType="number-pad"
                maxLength={6}
                defaultValue={valorGasto.toString()}
                onChangeText={(text) => {
                  setValorGasto(text);
                }}
              />
            </View>

            {/* Input Quantidade */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Quantidade comprada (kg):
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
                style={{ textAlign: "center", width: "100%" }}
                keyboardType="number-pad"
                maxLength={6}
                defaultValue={quantidadeComprada.toString()}
                onChangeText={(text) => {
                  setQuantidadeComprada(text);
                }}
              />
            </View>

            {/* Submit Button */}
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  console.log("Modal fechou!");
                }}
              >
                <Text
                  style={{
                    ...defaultStyles.insertPressable,
                    backgroundColor: "#C53B29",
                  }}
                >
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  console.log("Modal fechou!");
                  handleInsert();
                }}
              >
                <Text style={defaultStyles.insertPressable}>Registrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const handleInsert = function () {
    console.log("Inserindo compra...");
    const formattedDate = format(new Date(date), "dd/MM/yyyy");

    console.log("Data: ", formattedDate);
    console.log("Valor: ", valorGasto);
    console.log("Quantidade: ", quantidadeComprada);

    const compra = {
      data: formattedDate,
      quantidade: quantidadeComprada,
      dinheiro: valorGasto,
    };
    postGasto(compra);
    atualizarGastoMesAtual();
    atualizarUltimasCompras();
    setModalVisible(false);
    showToast();
  };

  // Toast setup
  const showToast = () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Compra registrada!",
      text2: "A compra foi registrada com sucesso!",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  return (
    <View style={defaultStyles.mainView}>
      <View style={defaultStyles.content}>
        <View style={defaultStyles.gastosContainer}>
          <Text
            onPress={() => console.log("HomeScreen")}
            style={defaultStyles.textoGastosContainer}
          >
            Meta gastos mensais:
          </Text>
          <Text style={defaultStyles.gastosText}>R$ {metaGastoMensal}</Text>
        </View>

        <View style={defaultStyles.gastosContainer}>
          <View>
            <Text
              onPress={() => console.log("HomeScreen")}
              style={defaultStyles.textoGastosContainer}
            >
              Mês atual:
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={defaultStyles.gastosText}>R$ </Text>
              <Text
                style={{
                  ...defaultStyles.gastosText,
                  color: gastoMesAtual <= 1000 ? "#29C478" : "#C53B29",
                }}
              >
                {gastoMesAtual}
                {/* <Ionicons name={arrowName} style={{ fontSize: 33 }} /> */}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setModalVisible(true);
            console.log("Abriu modal!");
          }}
        >
          <Text style={defaultStyles.insertPressable}>Registrar Compra</Text>
        </Pressable>
        {renderModal()}
        <View style={defaultStyles.content}>
          <Text style={defaultStyles.mainText}>Últimas 10 compras</Text>
          <FlatList
            data={ultimasCompras}
            renderItem={({ item }) => (
              <View style={defaultStyles.gastosContainer}>
                <Text style={defaultStyles.textoGastosContainer}>
                  {item.data}
                </Text>
                <Text style={defaultStyles.gastosText}>R$ {item.dinheiro}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({});
