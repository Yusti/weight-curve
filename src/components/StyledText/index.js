import React from 'react'
import { View, TextInput, Text } from 'react-native'

import styles from './styles'

export default function StyledTextInput({ text, size, color, style }) {
  return <Text style={[styles[size], styles[color], style]}>{text}</Text>
}
