import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";

export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* showMessage() triggers */}
        <FlashMessage position="top" />

        <MainAppStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
