import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import WeightCurveScreen from '../screens/WeightCurveScreen'
import WeightCurveFirstScreen from '../screens/WeightCurveFirstScreen'
import WeightCurveAddScreen from '../screens/WeightCurveAddScreen'

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    WeightCurve: {
      screen: WeightCurveScreen,
    },
    WeightCurveFirst: {
      screen: WeightCurveFirstScreen,
    },
    WeightCurveAdd: {
      screen: WeightCurveAddScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
)
