import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    justifyContent: 'center',
  },
  fontBig: {
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#2b3857',
    marginHorizontal: 50,
    marginVertical: 40,
  },
  fontMedium: {
    fontSize: 19,
    lineHeight: 25,
    color: '#373740',
  },
  fontSmall: {
    fontSize: 13,
    lineHeight: 20,
    color: '#8392a7',
  },
  textInputWrapper: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 9,
    height: 80,
    paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 17,
    borderRadius: 10,
  },
  pinkButton: {
    backgroundColor: '#fa4169',
    justifyContent: 'center',
    height: 73,
    borderRadius: 41,
    padding: 10,
    margin: 30,
    shadowColor: '#8c2d7c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  }
})
