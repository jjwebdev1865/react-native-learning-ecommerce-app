import { Image, StyleSheet } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/image-paths";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
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

const SignInScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data: FormData) => {
    navigation.navigate("MainAppBottomTabs");
  };

  return (
    <AppSafeView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <AppTextInputController
        placeholder="Email"
        name="email"
        control={control}
      />

      <AppTextInputController
        placeholder="Password"
        name="password"
        control={control}
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      <AppButton title="Login" onPress={handleSubmit(handleLogin)} />
      <AppButton
        title="Sign Up"
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      />
    </AppSafeView>
  );
};

export default SignInScreen;

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
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: verticalScale(15),
    borderColor: AppColors.primary,
  },
});
