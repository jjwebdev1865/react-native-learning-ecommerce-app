import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";

interface IAppRadioWithTitleProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const AppRadioWithTitle = ({ title, selected, onPress }: IAppRadioWithTitleProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default AppRadioWithTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(5),
  },
  circle: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: AppColors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: AppColors.black,
  },
  title: {
    fontSize: scale(16),
    marginStart: scale(10),
  },
});
