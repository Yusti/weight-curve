import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  curveContainer: {
    backgroundColor: '#fff',
    height: 282,
    margin: 30,
    marginBottom: 21,
    borderRadius: 11,
    shadowColor: 'rgba(0, 0, 0, .05)',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.29,
  },
  curveField: {
    height: 146,
    margin: 30,
    marginBottom: 12,
  },
  point: {
    width: 11,
    height: 11,
    borderColor: '#40e0be',
    borderWidth: 2,
    borderRadius: 5.5,
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 100,
  },
  addIco: {
    width: 53,
    height: 53,
    alignSelf: 'flex-end',
  },
  curveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 19,
  },
  weightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 23,
    height: 80,
    marginLeft: 30,
    marginBottom: 17,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    shadowColor: 'rgba(0, 0, 0, .05)',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.29,
  },
  rightIco: {
    width: 29,
    height: 20,
  },
  line: {
    position: 'absolute',
    borderLeftWidth: 2,
    borderLeftColor: '#40e0be',
  },
})
