import { StyleSheet, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { commonStyles } from "../styles/sharedStyles";
import { AppColors } from "../styles/colors";
import AppText from "./texts/AppText";
import { OrderDetail } from "../config/dataServices";
import { getDateFromFirestoreTimestamp } from "../helpers/dateTimeHelper";

interface IOrderDetailsProps {
  order: OrderDetail;
}

const OrderDetails = ({ order }: IOrderDetailsProps) => {
  const useFirebase = false;

  let date = "";
  if (useFirebase) {
    date = getDateFromFirestoreTimestamp(order.completedDate);
    console.log("need to update the displayed component to, ", date);
  } else {
    date = order.completedDate.toDateString();
  }
  return (
    <View style={styles.container}>
      <AppText style={styles.headerText}>ORDER DETAILS:</AppText>
      <View style={{ paddingVertical: verticalScale(4) }}>
        <View style={styles.row}>
          <AppText>Total Price:</AppText>
          <AppText style={styles.textValue}>${order.totalPrice}</AppText>
        </View>
        <View style={styles.row}>
          <AppText>Date:</AppText>
          <AppText style={styles.textValue}>{date}</AppText>
        </View>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.shadow,
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: AppColors.white,
    marginTop: verticalScale(15),
  },
  headerText: {
    fontSize: scale(14),
    borderBottomWidth: 2,
    borderBottomColor: AppColors.black,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textValue: {
    color: AppColors.red,
  },
});
