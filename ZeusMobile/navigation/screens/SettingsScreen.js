import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React from "react";
import defaultStyles from "../../themes/styles";
import { useState } from "react";
import { getDefaultValues, patchDefaultValues } from "../../services/Api.js";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function SettingsScreen({ navigation }) {
  //Setup Modal
  const [modalPerfil, setModalPerfil] = useState(false);
  const showModalPerfil = () => setModalPerfil(true);
  const hideModalPerfil = () => setModalPerfil(false);

  const [modalValoresDefault, setModalValoresDefault] = useState(false);
  const showModalValoresDefault = () => setModalValoresDefault(true);
  const hideModalValoresDefault = () => setModalValoresDefault(false);
  const handleModalValoresDefault = function () {
    console.log("Enviando valores default...");

    patchDefaultValues({
      newMetaGastoMensal: metaGastoMensal,
      newDinheiroDefault: dinheiroDefault,
      newQuantidadeDefault: quantidadeDefault,
    }).then((response) => {
      console.log("Valores default enviados! Resposta: ", response.data);
    });
    hideModalValoresDefault();
    showToast();
  };

  const [modalSobre, setModalSobre] = useState(false);
  const showModalSobre = () => setModalSobre(true);
  const hideModalSobre = () => setModalSobre(false);
  const transparent = "rgba(0, 0, 0, 0.5)";

  // Setup valores Default
  const [metaGastoMensal, setMetaGastoMensal] = useState(1000);
  const [dinheiroDefault, setDinheiroDefault] = useState(100);
  const [quantidadeDefault, setQuantidadeDefault] = useState(10);

  // Atualizar valores default
  const atualizarValoresDefault = function () {
    // console.log("Recebendo valores default...");
    getDefaultValues().then((response) => {
      const responseData = response.data[0];
      // console.log("Valores recebidos: ", responseData);
      setMetaGastoMensal(responseData.metaGastoMensal);
      setDinheiroDefault(responseData.dinheiroDefault);
      setQuantidadeDefault(responseData.quantidadeDefault);
    });
  };

  // o useEffect é chamado toda vez que a tela é aberta, sendo que para o tab navigator, ela só é renderizada uma unica vez
  // useEffect(() => {
  //   atualizarValoresDefault();
  // }, []);

  // o useFocusEffect é chamado toda vez que a tela tem foco
  useFocusEffect(
    React.useCallback(() => {
      console.log("Entrando em SettingsScreen.");
      atualizarValoresDefault();
      return () => {
        console.log("Saindo de SettingsScreen.");
      };
    }, [])
  );

  // Setup Toast
  const showToast = () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Valores padrão atualizados!",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  return (
    <View style={defaultStyles.mainView}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={defaultStyles.mainText}
      >
        Ajustes
      </Text>
      <Pressable
        onPress={showModalPerfil}
        style={{ ...defaultStyles.insertPressable, width: 200 }}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Perfil
        </Text>
      </Pressable>
      <Pressable
        onPress={showModalValoresDefault}
        style={{ ...defaultStyles.insertPressable, width: 200 }}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Valores Padrão
        </Text>
      </Pressable>
      <Pressable
        onPress={showModalSobre}
        style={{ ...defaultStyles.insertPressable, width: 200 }}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Sobre
        </Text>
      </Pressable>
      {/* Modal Perfil */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPerfil}
        style={{ width: "80%" }}
      >
        <View
          style={{
            ...defaultStyles.content,
            backgroundColor: transparent,
            justifyContent: "center",
          }}
        >
          <View style={{ ...defaultStyles.modalView, width: "80%" }}>
            <Text style={{ fontSize: 26, fontWeight: "bold" }}>Perfil</Text>
            <Image
              source={require("../../assets/haru_sorrindo.jpeg")}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nome:</Text>
            <View style={defaultStyles.defaultInputContainer}>
              <Text style={{ fontSize: 20 }}>Felipe Gaby</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Email:</Text>
            <View style={defaultStyles.defaultInputContainer}>
              <Text style={{ fontSize: 20 }}>felipe@unifor.br</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Nome do Pet:
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <Text style={{ fontSize: 20 }}>King Haru</Text>
            </View>
            <Pressable onPress={hideModalPerfil}>
              <Text style={defaultStyles.insertPressable}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal Valores Default */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalValoresDefault}
      >
        <View
          style={{
            ...defaultStyles.content,
            backgroundColor: transparent,
            justifyContent: "center",
          }}
        >
          <View style={defaultStyles.modalView}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Valores Padrão
            </Text>
            <Text style={{ fontSize: 16 }}>
              Editar os valores padrão para um registro de compra
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Meta de Gastos:
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
                style={{ textAlign: "center", width: "100%" }}
                keyboardType="number-pad"
                maxLength={6}
                defaultValue={metaGastoMensal.toString()}
                onChangeText={(text) => {
                  setMetaGastoMensal(text);
                }}
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Valor gasto (R$):
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
                style={{ textAlign: "center", width: "100%" }}
                keyboardType="number-pad"
                maxLength={6}
                defaultValue={dinheiroDefault.toString()}
                onChangeText={(text) => {
                  setDinheiroDefault(text);
                }}
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Quantidade comprada (kg):
            </Text>
            <View style={defaultStyles.defaultInputContainer}>
              <TextInput
                style={{ textAlign: "center", width: "100%" }}
                keyboardType="number-pad"
                maxLength={6}
                defaultValue={quantidadeDefault.toString()}
                onChangeText={(text) => {
                  setQuantidadeDefault(text);
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={hideModalValoresDefault}>
                <Text
                  style={{
                    ...defaultStyles.insertPressable,
                    backgroundColor: "#C53B29",
                  }}
                >
                  Voltar
                </Text>
              </Pressable>
              <Pressable onPress={handleModalValoresDefault}>
                <Text style={defaultStyles.insertPressable}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Sobre */}
      <Modal animationType="fade" transparent={true} visible={modalSobre}>
        <View
          style={{
            ...defaultStyles.content,
            backgroundColor: transparent,
            justifyContent: "center",
          }}
        >
          <View style={defaultStyles.modalView}>
            <Text style={{ fontSize: 26, fontWeight: "bold" }}>Sobre</Text>
            <Text style={{ fontSize: 20 }}>
              Oie! Eu sou o Haru, o shiba inu mais lindo do mundo! 🐶 Essa
              aplicação foi feita para ajudar o meu dono a controlar os gastos
              comigo! 🐾 Espero que você goste! 🐕
            </Text>
            <Pressable onPress={hideModalSobre}>
              <Text style={defaultStyles.insertPressable}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({});
