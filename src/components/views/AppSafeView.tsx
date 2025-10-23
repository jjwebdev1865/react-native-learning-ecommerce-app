import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ViewStyle,
} from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { IS_ANDROID } from "../../constants/constant";

interface AppSafeViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const AppSafeView = ({ children, style }: AppSafeViewProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSafeView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingTop: IS_ANDROID ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
  },
});
