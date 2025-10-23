import { StyleSheet, Text, TextProps } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: any;
  variant?: "medium" | "bold";
}

const AppText = ({
  children,
  style,
  variant = "medium",
  ...rest
}: AppTextProps) => {
  return (
    <Text {...rest} style={[styles[variant], style]}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontSize: scale(18),
    color: AppColors.black,
    fontFamily: AppFonts.Bold,
  },
  medium: {
    fontSize: scale(16),
    color: AppColors.black,
    fontFamily: AppFonts.Medium,
  },
});
