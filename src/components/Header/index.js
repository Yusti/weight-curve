import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

import StyledText from '../StyledText'

import styles from './styles'

export default function Header({ onBackPressed, RightButton }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPressed}>
        <Image
          source={require('../../../assets/images/back.png')}
          fadeDuration={0}
          style={styles.backIco}
        />
      </TouchableOpacity>
      <StyledText text="Weight curve" size="medium" style={styles.title} />
      <View style={styles.rightButton}>{!!RightButton && <RightButton />}</View>
    </View>
  )
}
