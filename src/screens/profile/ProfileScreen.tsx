import { StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <AppSafeView>
      <HomeHeader />

      <AppText
        variant="bold"
        style={{ fontSize: scale(18), marginTop: verticalScale(10) }}
      >
        Hello, Jim
      </AppText>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title="My Orders"
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton
          title="Language"
          onPress={() => console.log("Language Clicked")}
        />
        <ProfileSectionButton
          title="Logout"
          onPress={() => console.log("Logout Clicked")}
        />
      </View>
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
