import { StyleSheet, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { SHIPPING_FEE, TAXES } from "../../constants/constant";

interface ITotalsViewProps {
  itemPrice: number;
}

const TotalsView = ({ itemPrice }: ITotalsViewProps) => {
  let total = 0;
  if (itemPrice !== 0) {
    total = itemPrice + SHIPPING_FEE + TAXES;
  }
  
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Items Price:</AppText>
        <AppText style={styles.textPrice}>${itemPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Taxes:</AppText>
        <AppText style={styles.textPrice}>${TAXES}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Shipping Fee:</AppText>
        <AppText style={styles.textPrice}>${SHIPPING_FEE}</AppText>
      </View>

      <View style={styles.separator} />
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Total:</AppText>
        <AppText style={styles.textPrice}>${total.toString()}</AppText>
      </View>
    </View>
  );
};

export default TotalsView;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  textTitle: {
    fontSize: scale(16),
    flex: 1,
  },
  textPrice: {
    fontSize: scale(16),
    color: AppColors.primary,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: AppColors.borderColor,
    marginVertical: verticalScale(5),
  },
});
