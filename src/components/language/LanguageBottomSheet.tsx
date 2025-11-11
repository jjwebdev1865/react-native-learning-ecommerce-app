import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { scale, verticalScale } from "react-native-size-matters";
import AppRadioWithTitle from "../inputs/AppRadioWithTitle";
import { languageArray } from "../../localization/languagesList";
import i18n from "../../localization/i18n";
import { useTranslation } from "react-i18next";

const LanguageBottomSheet = () => {
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const onLanguagePress = (code: string) => {
    setSelectedLang(code);
  };

  const handleConfirm = () => {
    console.log("Confirming Language Change: ", selectedLang);
    SheetManager.hide("LANG_SHEET");
    i18n.changeLanguage(selectedLang);
  };

  return (
    <ActionSheet id="LANG_SHEET">
      <View style={styles.container}>
        <AppText
          style={{ marginBottom: verticalScale(20), textAlign: "center" }}
        >
          {t("profile_change_language", "Change Language")}
        </AppText>

        {languageArray.map((lang) => (
          <AppRadioWithTitle
            key={lang.code}
            title={lang.label}
            selected={selectedLang === lang.code}
            onPress={() => onLanguagePress(lang.code)}
          />
        ))}

        <AppButton
          title={t("profile_confirm_button_label", "Confirm")}
          onPress={handleConfirm}
        />
      </View>
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
  },
});
