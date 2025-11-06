import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import { IS_ANDROID, IS_IOS } from "../../constants/constant";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required")
      .min(3, "Name is too short"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Phone number is too short"),
    detailedAddress: yup
      .string()
      .required("Address is required")
      .min(15, "Address is too short"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CheckoutScreen = () => {

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { userData } = useSelector((state: RootState) => state.userSlice);
  console.log('userdata', userData)

  const saveOrder = (data: FormData) => {
    Alert.alert("Order Placed", JSON.stringify(data, null, 2));
    console.log("Order Data: ", data);
  };

  return (
    <AppSafeView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            placeholder="Full Name"
            name="fullName"
            control={control}
          />
          <AppTextInputController
            placeholder="Phone Number"
            name="phoneNumber"
            control={control}
          />
          <AppTextInputController
            placeholder="Detailed Address"
            name="detailedAddress"
            control={control}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSafeView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? verticalScale(15) : undefined,
    paddingTop: verticalScale(15),
  },
  buttonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_ANDROID ? verticalScale(15) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: verticalScale(10),
  },
});
