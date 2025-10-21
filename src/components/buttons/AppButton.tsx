import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: any;
  styleTitle?: any;
  disabled?: boolean;
}

const AppButton = ({
  onPress,
  title,
  style,
  styleTitle,
  backgroundColor = AppColors.primary,
  textColor = AppColors.white,
  disabled = false,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? AppColors.disabledGray : backgroundColor,
        },
        style,
      ]}
      disabled={disabled}
    >
      <AppText
        style={[styles.textTitle, { color: textColor }, styleTitle]}
        variant="bold"
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(25),
    alignSelf: "center",
  },
  textTitle: {
    fontSize: scale(16),
  },
});
