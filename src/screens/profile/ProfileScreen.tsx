import { StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { useNavigation } from "@react-navigation/native";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLanguages = () => {
    SheetManager.show("LANG_SHEET");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USER_DATA");
    navigation.navigate("AuthStack" as never);
  };
  return (
    <AppSafeView>
      <HomeHeader />

      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={t("profile_my_orders_label", "My Orders")}
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton
          title={t("profile_language_label", "Language")}
          onPress={handleLanguages}
        />
        <ProfileSectionButton
          title={t("profile_logout_button", "Logout")}
          onPress={handleLogout}
        />
      </View>

      <LanguageBottomSheet />
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
