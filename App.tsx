import { StyleSheet } from "react-native";
import AppText from "./src/components/texts/AppText";
import AppSafeView from "./src/components/views/AppSafeView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AppButton from "./src/components/buttons/AppButton";
import AppTextInput from "./src/components/inputs/AppTextInput";

export default function App() {
  return (
    <>
      {/* showMessage() triggers */}
      <FlashMessage position="top" />

      <AppSafeView style={styles.container}>
        <AppTextInput
          value={""}
          placeholder="Enter text"
          onChangeText={function (text: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </AppSafeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
