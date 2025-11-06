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
import {
  IS_ANDROID,
  IS_IOS,
  SHIPPING_FEE,
  TAXES,
} from "../../constants/constant";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { emptyCart } from "../../store/reducers/cartSlice";

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
  const useFirebase = false;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { userData } = useSelector((state: RootState) => state.userSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const totalProductsPriceSum = items.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const totalPrice = totalProductsPriceSum + TAXES + SHIPPING_FEE; // Add tax, shipping, etc. if needed

  const saveOrder = async (formData: FormData) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductsPriceSum,
        createdAt: new Date(),
        totalPrice,
      };

      if (useFirebase) {
        const userOrderRef = collection(
          doc(db, "users", userData.uid),
          "orders"
        );
        // should be able to see this in the db under orders collections
        const orderRef = await addDoc(userOrderRef, orderBody);
      }

      showMessage({ type: "success", message: "Order placed successfully!" });
      navigation.goBack();
      dispatch(emptyCart());
    } catch (error) {
      console.error("Error saving order: ", error);
      showMessage({
        type: "danger",
        message: "Failed to place order. Please try again.",
      });
    }
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
