import { StyleSheet } from "react-native";
import AppText from "./src/components/texts/AppText";
import AppSafeView from "./src/components/views/AppSafeView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AppButton from "./src/components/buttons/AppButton";
import AppTextInput from "./src/components/inputs/AppTextInput";
import SignInScreen from "./src/screens/auth/SignInScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* showMessage() triggers */}
        <FlashMessage position="top" />

        <AuthStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
