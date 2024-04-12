import {
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

export default function HomeScreen({ navigation }) {
  const [mediaMensal, setMediaMensal] = useState(100.25);
  const [mesAtual, setMesAtual] = useState(560.78);

  // State Setup
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
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
            <Pressable
              onPress={() => {
                setModalVisible(false);
                console.log("Modal fechou!");
                handleInsert();
              }}
            >
              <Text style={defaultStyles.insertPressable}>Enviar</Text>
            </Pressable>
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

        {/* <Pressable
          onPress={() => {
            setModalVisible(true);
            console.log("Abriu modal!");
          }}
        >
          <Text style={defaultStyles.insertPressable}>Registrar Compra</Text>
        </Pressable>
        {renderModal()} */}
        <View style={defaultStyles.gastosContainer}>
          <View>
            <Text
              onPress={() => console.log("HomeScreen")}
              style={defaultStyles.textoGastosContainer}
            >
              Mês atual:
            </Text>
            <Text
              style={{
                ...defaultStyles.gastosText,
                color: mesAtual <= 1000 ? "#0AF081" : "#F00A91",
              }}
            >
              R$ {mesAtual}
            </Text>
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
