import { StyleSheet, ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoBold: require("./src/assets/fonts/Nunito-Bold.ttf"),
    NunitoMedium: require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

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
