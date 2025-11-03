import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { scale, verticalScale } from "react-native-size-matters";


interface IAppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  secureTextEntry?: boolean;
  rules?: object;
  keyboardType?: "default" | "email-address" | "numeric";
}

const AppTextInputController =<T extends FieldValues> ({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType,
}: IAppTextInputControllerProps<T>) => {
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
