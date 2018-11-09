import React from 'react'
import {
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'

import * as firebase from 'firebase'

import styles from './styles'

export default class WeightCurveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weightData: [] };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Weight curve",
      headerRight: (
        <Button
          onPress={() => navigation.navigate('WeightCurveAdd')}
          title="Add"
        />
      ),
    };
  };

  componentDidMount() {
    this._getWeightData()
  }

  render() {
    const { weightData } = this.state

    if (!weightData.length) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.curveContainer}>
          <View style={styles.curveField}>
            {this._renderCurvePoints()}
          </View>
        </View>
      </View>
    )
  }

  _renderCurvePoints = () => {
    const { weightData } = this.state

    let minWeight = +weightData[0].weight
    let maxWeight = +weightData[0].weight
    let minDate = +new Date(weightData[0].date)
    let maxDate = +new Date(weightData[0].date)

    for (let i = 0; i < weightData.length; i++) {
      const currWeight = +weightData[i].weight
      const currDate = +new Date(weightData[i].date)
      minWeight = minWeight > currWeight ? currWeight : minWeight
      maxWeight = maxWeight < currWeight ? currWeight : maxWeight
      minDate = minDate > currDate ? currDate : minDate
      maxDate = maxDate < currDate ? currDate : maxDate
    }

    const weightDiff = maxWeight - minWeight
    const dateDiff = maxDate - minDate

    return weightData.map(item => {
      const bottom = (item.weight - minWeight) / weightDiff * 146
      const left = (+new Date(item.date) - minDate) / dateDiff * 250
      console.log(item, minDate, maxDate, 'right', left, 'top', bottom)

      return <View key={item.date} style={[styles.point, { bottom, left }]} />
    })
  }

  _getWeightData = () => {
    const { user } = this.props.screenProps
    firebase.database().ref(`/users/${user.uid}/weight`).on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const currentData = childSnapshot.val()
        this.setState(prevState => ({ weightData: [
          ...prevState.weightData,
          {
            date: currentData.date,
            weight: currentData.weight,
          },
        ]}))
      })
    })
  }
}
