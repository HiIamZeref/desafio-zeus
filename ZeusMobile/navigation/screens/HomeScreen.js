import {
  Dimensions,
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
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {
  // State Setup (dados principais)
  const [mediaMensal, setMediaMensal] = useState(100.25);
  const [mesAtual, setMesAtual] = useState(500);

  // Arrow Setup
  const arrowName = mesAtual <= 1000 ? "arrow-down" : "arrow-up";

  // State Setup (dados modal)
  const [valorGasto, setValorGasto] = useState(200.0);
  const [quantidadeComprada, setQuantidadeComprada] = useState(10.0);

  // Modal Setup
  const [modalVisible, setModalVisible] = useState(false);
  const transparent = "rgba(0, 0, 0, 0.5)";

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => setShowPicker(!showPicker);

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
                onChange={onChangeDatePicker}
              />
            )}
            {/* Input valor */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Valor gasto (R$):
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
                style={{ textAlign: "center" }}
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
              Quantidade comprada (Kg):
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
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
    console.log("Data: ", date);
    console.log("Valor: ", valorGasto);
    console.log("Quantidade: ", quantidadeComprada);
  };
  const sizeWidth = Dimensions.get("window").width;

  return (
    <View style={defaultStyles.mainView}>
      <View style={defaultStyles.content}>
        <View style={defaultStyles.gastosContainer}>
          <Text
            onPress={() => console.log("HomeScreen")}
            style={defaultStyles.textoGastosContainer}
          >
            Gasto médio mensal:
          </Text>
          <Text style={defaultStyles.gastosText}>R$ {mediaMensal}</Text>
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
                  color: mesAtual <= 1000 ? "#29C478" : "#C53B29",
                }}
              >
                {mesAtual}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
