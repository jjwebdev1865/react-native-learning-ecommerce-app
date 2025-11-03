import { Image, StyleSheet } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/image-paths";
import { scale, verticalScale } from "react-native-size-matters";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("User Name is required")
      .min(6, "User Name is too short"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .min(6, "Email is too short"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignUpScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = (data: FormData) => {
    console.log("Create New Account pressed");
  };

  return (
    <AppSafeView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <AppTextInputController
        placeholder="User name"
        name="userName"
        control={control}
      />
      <AppTextInputController
        placeholder="Email"
        name="email"
        control={control}
      />
      <AppTextInputController
        placeholder="Password"
        name="password"
        control={control}
      />

      <AppButton
        title="Create New Account"
        onPress={handleSubmit(handleSignUp)}
      />
      <AppButton
        title="Go To Sign In"
        style={styles.goToSignInButton}
        textColor={AppColors.primary}
        onPress={() => {
          navigation.navigate("SignInScreen");
        }}
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
