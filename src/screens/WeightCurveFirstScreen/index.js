import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native'

import * as firebase from 'firebase'
import moment from 'moment'

import Header from '../../components/Header'
import StyledText from '../../components/StyledText'
import StyledTextInput from '../../components/StyledTextInput'

import styles from './styles'

export default class WeightCurveFirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      startWeight: null,
      currentDate: moment().format('YYYY-MM-DD'),
      currentWeight: null,
    };
  }

  componentDidMount() {
    this._setUserDueDate()
  }

  render() {
    const { startDate, startWeight, currentDate, currentWeight } = this.state;
    return (
      <View style={styles.container}>
        <Header onBackPressed={this._navigateBack} />
        <ScrollView>
          <StyledText
            style={styles.title}
            text="Welcome, add your weight to get started. This will sync to your pregnancy journey."
            size="big"
            color="darkBlue"
          />
          <View style={styles.container}>
            <StyledTextInput header="Date of start weight" value={startDate} onChangeText={this._setStartDate} />
            <StyledTextInput header="Start weight" value={startWeight} onChangeText={this._setStartWeight} />
            <StyledTextInput header="Current date" value={currentDate} onChangeText={this._setCurrentDate} />
            <StyledTextInput header="Current weight" value={currentWeight} onChangeText={this._setCurrentWeight} />
          </View>
          <TouchableOpacity onPress={this._saveToDB} style={styles.pinkButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  _setStartDate = startDate => this.setState({ startDate })

  _setStartWeight = startWeight => this.setState({ startWeight })

  _setCurrentDate = currentDate => this.setState({ currentDate })

  _setCurrentWeight = currentWeight => this.setState({ currentWeight })

  _setUserDueDate = () => {
    const { user } = this.props.screenProps
    firebase.database().ref(`/users/${user.uid}`).on('value', snapshot => {
      this.setState({ startDate: moment(snapshot.val().dueDate).subtract(280, 'days').format('YYYY-MM-DD') })
    })
  }

  _saveToDB = () => {
    const { startDate, startWeight, currentDate, currentWeight } = this.state
    const { user } = this.props.screenProps
    const today = moment().format('YYYY-MM-DD')
    const isDateFormat = date => {
      const dateRegexp = /(2\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      return dateRegexp.test(date);
    }
    if (
      startDate > today
      || currentDate > today
      || !isDateFormat(startDate)
      || !startDate(currentDate)
      || startWeight <= 0
      || currentWeight <= 0
    ) {
      Alert.alert('Wrong data format');
    } else if (startDate && startWeight && currentDate && currentWeight) {
      const ref = firebase.database().ref(`/weightCurvePointsByUser/${user.uid}`)
      ref.push({
        date: startDate,
        weight: startWeight * 1000,
      })
      ref.push({
        date: currentDate,
        weight: currentWeight * 1000,
      })
      this.props.navigation.navigate('WeightCurve')
    } else {
      Alert.alert('Please fill all data');
    }
  }

  _navigateBack = () => this.props.navigation.goBack()
}
