import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import { AntDesign } from "@expo/vector-icons";

interface CartItemProps {
  title: string;
  price: number;
  imageURL: string;
  quantity: number;
  onDeletePress: () => void;
  onIncreasePress: () => void;
  onDecreasePress: () => void;
}

const CartItem = ({
  title,
  price,
  imageURL,
  quantity,
  onDeletePress,
  onIncreasePress,
  onDecreasePress,
}: CartItemProps) => {
  return (
    <View style={styles.container}>
      {/* Image container  */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageURL,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Details container */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.textTitle}>{title}</AppText>
        <AppText style={styles.textPrice}>{price}</AppText>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onDecreasePress}>
            <AntDesign
              name="minus"
              size={scale(12)}
              color={AppColors.primary}
            />
          </TouchableOpacity>
          <AppText style={styles.textQuantity}>{quantity}</AppText>
          <TouchableOpacity style={styles.iconButton} onPress={onIncreasePress}>
            <AntDesign name="plus" size={scale(12)} color={AppColors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete button */}
      <View style={styles.deleteContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
          <AntDesign name="delete" size={scale(12)} color={AppColors.red} />
          <AppText style={styles.textDelete}>Delete</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    paddingBottom: verticalScale(4),
    borderColor: AppColors.borderColor,
  },
  imageContainer: {
    flex: 1.5,
  },
  detailsContainer: {
    flex: 3.5,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingEnd: scale(12),
  },
  image: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: scale(14),
    color: AppColors.primary,
    fontFamily: AppFonts.Medium,
    marginTop: verticalScale(5),
  },
  textPrice: {
    fontSize: scale(16),
    color: AppColors.primary,
    fontFamily: AppFonts.Bold,
    marginVertical: verticalScale(5),
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  textDelete: {
    marginLeft: scale(7),
    fontFamily: AppFonts.Medium,
    color: AppColors.midGray,
    fontSize: scale(12),
    marginTop: 3,
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scale(6),
    borderRadius: scale(30),
    borderWidth: scale(1),
    borderColor: AppColors.borderColor,
    width: scale(80),
    paddingVertical: verticalScale(4),
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.lightGray,
    padding: scale(4),
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
  },
  textQuantity: {
    flex: 1,
    textAlign: "center",
    color: AppColors.primary,
  },
});
