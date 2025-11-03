import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { scale, verticalScale } from "react-native-size-matters";


interface IAppTextInputControllerProps {
  control: any;
  name: string;
  rules: any;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
}

const AppTextInputController = ({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType,
}: IAppTextInputControllerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={error && styles.errorInput}
          />
          {error && <AppText style={styles.textError}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

export default AppTextInputController;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: AppColors.red,
  },
  textError: {
    color: AppColors.red,
    fontSize: scale(12),
    textAlign: "center",
    marginBottom: verticalScale(10),
    marginTop: -verticalScale(5),
  },
});
