import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../styles/sharedStyles";

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  onPress: () => void;
}

const ProductCard = ({ title, price, imageUrl, onPress }: ProductCardProps) => {
  return (
    <View style={styles.container}>
      {/* Add to Cart button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={onPress}>
        <Ionicons name="cart" size={scale(16)} color={AppColors.white} />
      </TouchableOpacity>

      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl}} />
      </View>
      {/* Description container */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>${price}</AppText>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: scale(160),
    height: verticalScale(190),
    backgroundColor: AppColors.white,
    borderRadius: scale(10),
    ...commonStyles.shadow,
  },
  addToCartButton: {
    height: scale(28),
    width: scale(28),
    position: "absolute",
    top: 5,
    left: 5,
    borderRadius: scale(14),
    backgroundColor: AppColors.primary,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    height: verticalScale(130),
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    paddingTop: scale(8),
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(10),
  },
  titleText: {
    fontSize: scale(14),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: scale(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: verticalScale(8),
  },
});
