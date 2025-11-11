import { StyleSheet, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const EmptyCart = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="shopping-outline"
        size={scale(100)}
        color={AppColors.primary}
        style={styles.icon}
      />
      <AppText style={styles.title}>
        {t("cart_empty_title", "Your cart is empty")}
      </AppText>
      <AppText style={styles.subTitle}>
        {t(
          "cart_empty_browse_products",
          "Browse our products and find something you like."
        )}
      </AppText>

      <AppButton
        title={t("cart_empty_start_shopping", "Start Shopping")}
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: scale(20),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginBottom: verticalScale(10),
  },
  subTitle: {
    fontSize: scale(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.midGray,
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  button: {
    width: "80%",
  },
  icon: {
    marginBottom: verticalScale(20),
    opacity: 0.8,
  },
});
