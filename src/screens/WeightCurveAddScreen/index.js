import React from 'react'
import { View, Button, Alert } from 'react-native'

import * as firebase from 'firebase'
import moment from 'moment'

import Header from '../../components/Header'
import StyledTextInput from '../../components/StyledTextInput'

import styles from './styles'

export default class WeightCurveAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format('YYYY-MM-DD'),
      startWeight: null,
    };
  }

  render() {
    const { startDate, startWeight } = this.state;
    return (
      <View style={styles.container}>
        <Header onBackPressed={this._navigateBack} RightButton={this._renderSaveButton} />
        <View style={styles.container}>
          <StyledTextInput header="Date" value={startDate} onChangeText={this._setStartDate} />
          <StyledTextInput header="Weight" value={startWeight} onChangeText={this._setStartWeight} />
        </View>
      </View>
    )
  }

  _renderSaveButton = () => (
    <View style={styles.addButton}>
      <Button onPress={this._saveToDB} title="Save" />
    </View>
  )

  _setStartDate = startDate => this.setState({ startDate })

  _setStartWeight = startWeight => this.setState({ startWeight })

  _saveToDB = () => {
    const { startDate, startWeight } = this.state
    const { user } = this.props.screenProps
    const isDateFormat = date => {
      const dateRegexp = /(2\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      return dateRegexp.test(date);
    }
    const today = moment().format('YYYY-MM-DD')
    if (startDate > today || !isDateFormat(startDate) || startWeight <= 0) {
      Alert.alert('Wrong dates');
    } else if (startDate && startWeight) {
      firebase.database().ref(`/weightCurvePointsByUser/${user.uid}`).push({
        date: startDate,
        weight: startWeight * 1000,
      });
      this.props.navigation.goBack()
    } else {
      Alert.alert('Please fill all data');
    }
  }

  _navigateBack = () => this.props.navigation.goBack()
}
