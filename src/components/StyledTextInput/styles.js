import { StyleSheet } from 'react-native'

import { colors } from '../../constants'

export default StyleSheet.create({
  textInputWrapper: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    marginVertical: 9,
    height: 80,
    paddingTop: 12,
    paddingBottom: 17,
    padding: 17,
    borderRadius: 11,
    shadowColor: 'rgba(0, 0, 0, .05)',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.29,
  },
})
