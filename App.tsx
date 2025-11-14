import { StyleSheet, ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import i18n from "./src/localization/i18n";
import { I18nextProvider } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";

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
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PersistGate persistor={persistor} >
            <NavigationContainer>
              {/* showMessage() triggers */}
              <FlashMessage position="top" />

              <MainAppStack />
            </NavigationContainer>
          </PersistGate>
        </I18nextProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
