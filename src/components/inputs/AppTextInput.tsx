import { StyleSheet, TextInput, TextStyle } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: TextStyle;
  keyboardType?: "default" | "email-address" | "numeric";
}

const AppTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
}: AppTextInputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    height: verticalScale(40),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: scale(15),
    fontSize: scale(16),
    backgroundColor: AppColors.white,
    width: "100%",
    marginBottom: verticalScale(10),
  },
});
