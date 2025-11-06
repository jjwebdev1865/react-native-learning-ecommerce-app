import { Alert, Image, StyleSheet } from "react-native";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

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

export const mockUserCredentialUser = {
  uuid: '12345',
  email: 'test@gmail.com',
  emailVerified: false,
  isAnonymous: false,
  providerData: [],
}

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const useFirebase = false;

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data: FormData) => {
    try {
      console.log("Create New Account pressed");
      if (useFirebase) {
        // TODO: Constantly getting network error. need to figure out why
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        dispatch(setUserData(userCredential.user))
      } else {
        // Mock dispatch for testing without Firebase
        dispatch(setUserData(mockUserCredentialUser as any));
      }

      Alert.alert("Account Created");
      navigation.navigate("MainAppBottomTabs");
      // return userCredential.user;
    } catch (error: any) {
      let errorMessage = "";
      console.error("Sign Up error:", error);
      if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error, please try again.";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      } else {
        errorMessage = "An error occurred during sign-up";
      }

      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
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
