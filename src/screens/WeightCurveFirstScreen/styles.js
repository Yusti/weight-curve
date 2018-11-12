import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginHorizontal: 50,
    marginVertical: 33,
  },
  pinkButton: {
    backgroundColor: '#fa4169',
    justifyContent: 'center',
    height: 73,
    borderRadius: 41,
    padding: 10,
    margin: 30,
    shadowColor: 'rgba(140, 45, 124, .25)',
    shadowOffset: { width: 0, height: 19 },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
})
