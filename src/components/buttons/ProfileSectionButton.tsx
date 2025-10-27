import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { scale, verticalScale } from "react-native-size-matters";
import { AppFonts } from "../../styles/fonts";
import { MaterialIcons } from "@expo/vector-icons";

interface IProfileSectionButtonProps {
  onPress: () => void;
  title: string;
}

const ProfileSectionButton = ({
  onPress,
  title,
}: IProfileSectionButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <AppText style={styles.textTitle}>{title}</AppText>
      </View>

      <View>
        <MaterialIcons
          name="arrow-forward-ios"
          size={scale(14)}
          color={AppColors.midGray}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSectionButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: AppColors.borderColor,
    paddingBottom: verticalScale(10),
    marginTop: verticalScale(14),
    flexDirection: "row",
    borderBottomWidth: 1
  },
  textTitle: {
    fontSize: scale(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  textContainer: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: scale(8),
  },
});
