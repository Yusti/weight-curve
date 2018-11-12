import { StyleSheet } from 'react-native'

import { colors } from '../../constants'

export default StyleSheet.create({
  // sizes
  medium: {
    fontSize: 17,
    lineHeight: 25,
  },
  small: {
    fontSize: 13,
    lineHeight: 20,
  },
  big: {
    fontSize: 24,
    lineHeight: 36,
  },

  // colors
  primary: {
    color: colors.primary,
  },
  secondary: {
    color: colors.secondary,
  },
  darkBlue: {
    color: colors.darkBlue,
  }
})
