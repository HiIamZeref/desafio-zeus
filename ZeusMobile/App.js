import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import InsertDataScreen from "./screens/InsertDataScreen";

export default function App() {
  console.log("App executed.");

  return (
    <SafeAreaView style={styles.container}>
      <InsertDataScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
