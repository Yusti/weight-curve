import React from 'react'
import { View, TextInput, Text } from 'react-native'

import StyledText from '../StyledText'

import styles from './styles'
import textStyles from '../StyledText/styles'

export default function StyledTextInput({ header, placeholder, value, onChangeText }) {
  return (
    <View style={styles.textInputWrapper}>
      <StyledText text={header} theme="small" color="secondary" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[textStyles.medium, textStyles.primary]}
      />
    </View>
  )
}
