import { StyleSheet, View } from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { scale, verticalScale } from "react-native-size-matters";
import AppRadioWithTitle from "../inputs/AppRadioWithTitle";

const LanguageBottomSheet = () => {
  return (
    <ActionSheet id="LANG_SHEET">
      <View style={styles.container}>
        <AppText style={{ marginBottom: verticalScale(20), textAlign: 'center'}}>Change Language</AppText>

        <AppRadioWithTitle title='English' selected={true} />
        <AppRadioWithTitle title='Spanish' selected={false} />

        <AppButton title="Confirm" onPress={() => console.log("here")} />
      </View>
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: scale(16),

  }
});
