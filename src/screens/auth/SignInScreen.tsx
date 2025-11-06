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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
import { mockUserCredentialUser } from "./SignUpScreen";

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
  const useFirebase = false;

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch()

  const handleLogin = async (data: FormData) => {
    console.log("Login data:", data);

    try {
      if (useFirebase) {
        // TODO: having network issues. need to fix
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        console.log("User logged in:", JSON.stringify(userCredential, null, 2));
        const userDataObj = {
          uid: userCredential.user.uid,
        }
        dispatch(setUserData(userDataObj))
      } else {
        dispatch(setUserData({
          uid: mockUserCredentialUser.uuid,
        }))
      }
      navigation.navigate("MainAppBottomTabs");
    } catch (error: any) {
      let errorMessage = "";
      console.error("Login error:", error);
      // NOTE: can return specific errors from firebase error codes
      if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error, please try again.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User not found.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Wrong email or password.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
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
