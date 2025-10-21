import { Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AppSafeView from "../../components/views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/image-paths";
import { scale, verticalScale } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <AppSafeView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInput
        placeholder="User Name"
        value={username}
        onChangeText={setUsername}
      />
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      <AppButton
        title="Create New Account"
        onPress={() => {
          console.log("Create New Account pressed");
        }}
      />
      <AppButton
        title="Go To Sign In"
        style={styles.goToSignInButton}
        textColor={AppColors.primary}
        onPress={() => {navigation.navigate("SignInScreen")}}
      />
    </AppSafeView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: verticalScale(150),
    width: scale(150),
    marginBottom: verticalScale(30),
  },
  appName: {
    fontSize: scale(16),
    marginBottom: verticalScale(15),
  },
  goToSignInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: verticalScale(15),
    borderColor: AppColors.primary,
  },
});
