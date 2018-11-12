import React from 'react'
import {
  View,
  ScrollView,
  Button,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'

import * as firebase from 'firebase'
import moment from 'moment'

import Header from '../../components/Header'
import StyledText from '../../components/StyledText'

import styles from './styles'

export default class WeightCurveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightData: [],
      screenWidth: Dimensions.get('window').width,
      dueDate: '',
    };
  }

  componentDidMount() {
    this._getWeightData()
    this._setUserDueDate()
  }

  render() {
    const { weightData } = this.state
    const weightDataLength = weightData.length

    if (!weightDataLength) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header onBackPressed={this._navigateBack} RightButton={this._renderAddButton} />
        <ScrollView>
          <View style={styles.curveContainer}>
            <View style={styles.curveField}>
              {this._renderCurvePoints()}
            </View>
            <View style={styles.curveFooter}>
              {this._renderDetailsCell("Start", `${weightData[0].weight} kg`)}
              {this._renderDetailsCell(
                "Change",
                `${(weightData[weightDataLength - 1].weight - weightData[0].weight).toFixed(1)} kg`,
              )}
              {this._renderDetailsCell("Current", `${weightData[weightDataLength - 1].weight} kg`)}
            </View>
          </View>
          {this._renderDetailsList()}
        </ScrollView>
      </View>
    )
  }

  _renderDetailsList = () => {
    const { weightData, dueDate } = this.state
    return weightData.map(item => {
      const days = moment(item.date).diff(dueDate, 'days')
      const weeks = Math.floor(days / 7)
      const weekDays = days % 7 + 1
      return (
        <View style={styles.weightDetails} key={item.date}>
          {this._renderDetailsCell("Week", `${weeks + 1} (${weeks}+${weekDays})`)}
          {this._renderDetailsCell("Weight", `${item.weight} kg`)}
          {this._renderDetailsCell("Date", item.date)}
          <Image
            source={require('../../../assets/images/arrowRight.png')}
            style={styles.rightIco}
          />
        </View>
      )
    })
  }

  _renderDetailsCell = (title, value) => 
    <View>
      <StyledText size="small" color="secondary" text={title} />
      <StyledText size="medium" color="primary" text={value} />
    </View>

  _renderAddButton = () =>
    <TouchableOpacity onPress={this._navigateToAddScreen}>
      <Image
        source={require('../../../assets/images/add.png')}
        style={styles.addIco}
        fadeDuration={0}
      />
    </TouchableOpacity>

  _renderCurvePoints = () => {
    const { weightData, screenWidth } = this.state

    const weightDataLength = weightData.length

    let minWeight = +weightData[0].weight
    let maxWeight = +weightData[0].weight
    let minDate = +new Date(weightData[0].date)
    let maxDate = +new Date(weightData[weightDataLength - 1].date)

    const linesData = []

    for (let i = 0; i < weightDataLength; i++) {
      const currWeight = +weightData[i].weight
      minWeight = minWeight > currWeight ? currWeight : minWeight
      maxWeight = maxWeight < currWeight ? currWeight : maxWeight
      if (i < weightDataLength - 1) {
        const xDiff = +weightData[i + 1].weight - currWeight
        const yDiff = +new Date(weightData[i + 1].date) - +new Date(weightData[i].date)
        linesData.push({ xDiff, yDiff })
      }
    }

    const weightDiff = (maxWeight - minWeight || 1) / 146
    const dateDiff = (maxDate - minDate) / (screenWidth - 130)

    const lines = []
    const points = []

    weightData.forEach((item, index) => {
      const bottom = maxWeight === minWeight ? 60 : (item.weight - minWeight) / weightDiff
      const left = (+new Date(item.date) - minDate) / dateDiff
      if (index < weightDataLength - 1) {
        const x = linesData[index].xDiff / weightDiff
        const y = linesData[index].yDiff / dateDiff
        const distance = Math.hypot(x, y)
        const angle = (Math.atan2(y, x) * 180 / Math.PI).toFixed()
        lines.push(<View
          key={`line-${item.date}`}
          style={[
            styles.line,
            {
              height: distance - 6,
              left: left + y / 2 + 4,
              bottom: Math.min(bottom, bottom + x) - (distance - Math.abs(x)) / 2 + 8,
              transform: [{ rotate: `${angle}deg`}],
            }
          ]}
        />)
      }
      points.push(<View key={`point-${item.date}`} style={[styles.point, { bottom, left }]} />)
    })
    return [...points, ...lines]
  }

  _getWeightData = () => {
    const { user } = this.props.screenProps
    firebase.database().ref(`/weightCurvePointsByUser/${user.uid}`).orderByChild("date").on('value', snapshot => {
      const result = []
      snapshot.forEach(childSnapshot => {
        const currentData = childSnapshot.val()
        result.push({
          date: currentData.date,
          weight: currentData.weight / 1000,
        })
      })
      this.setState({ weightData: result })
    })
  }

  _navigateBack = () => this.props.navigation.navigate('Home')

  _navigateToAddScreen = () => this.props.navigation.navigate('WeightCurveAdd')

  _setUserDueDate = () => {
    const { user } = this.props.screenProps
    firebase.database().ref(`/users/${user.uid}`).on('value', snapshot => {
      this.setState({ dueDate: moment(snapshot.val().dueDate).subtract(280, 'days').format('YYYY-MM-DD') })
    })
  }
}
