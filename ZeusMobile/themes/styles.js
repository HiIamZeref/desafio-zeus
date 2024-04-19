import { Dimensions, StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  insertPressable: {
    backgroundColor: "#f0a30a",
    fontSize: 20,
    color: "white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  defaultDatePickerInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 200,
    textAlign: "center",
  },

  defaultInputContainer: {
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    width: 200,
    textAlign: "center",
  },
  gastosContainer: {
    flexDirection: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#3a609b",
    margin: 10,
    padding: 10,
    width: Dimensions.get("window").width * 0.9, // 90% da largura da tela
  },
  textoGastosContainer: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f0a30a",
  },
  gastosText: {
    fontSize: 40,
    color: "white",
  },
  mainText: { fontSize: 26, fontWeight: "bold", color: "#f0a30a" },
});

export default defaultStyles;
