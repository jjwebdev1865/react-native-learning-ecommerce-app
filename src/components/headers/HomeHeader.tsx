import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { AppColors } from '../../styles/colors'
import { scale, verticalScale } from 'react-native-size-matters'
import { IMAGES } from '../../constants/image-paths'

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: verticalScale(10)
  },
  logo: {
    height: verticalScale(40),
    width: scale(40),
    tintColor: AppColors.white,
  }
})