import { StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLanguages = () => {
    SheetManager.show("LANG_SHEET");
  };
  return (
    <AppSafeView>
      <HomeHeader />

      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title="My Orders"
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton title="Language" onPress={handleLanguages} />
        <ProfileSectionButton
          title="Logout"
          onPress={() => console.log("Logout Clicked")}
        />
      </View>

      <LanguageBottomSheet />
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
