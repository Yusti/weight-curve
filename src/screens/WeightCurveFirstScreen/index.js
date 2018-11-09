import React from 'react'
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native'

import * as firebase from 'firebase'

import styles from './styles'

export default class WeightCurveFirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      startWeight: null,
      currentDate: '',
      currentWeight: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Weight curve",
    };
  };

  render() {
    const { startDate, startWeight, currentDate, currentWeight } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.fontBig}>
          Welcome, add your weight to get started. This will sync to your pregnancy journey.
        </Text>
        <View style={styles.container}>
          {this._renderTextInput('Date of start weight', startDate, this._getStartDate)}
          {this._renderTextInput('Start weight', startWeight, this._getStartWeight)}
          {this._renderTextInput('Current date', currentDate, this._getCurrentDate)}
          {this._renderTextInput('Current weight', currentWeight, this._getCurrentWeight)}
        </View>
        <TouchableOpacity onPress={this._saveToDB} style={styles.pinkButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderTextInput = (header, value, actionOnUpdate) =>
    <View style={styles.textInputWrapper}>
      <Text style={styles.fontSmall}>{header}</Text>
        <TextInput
          value={value}
          onChangeText={actionOnUpdate}
          placeholder="Enter value here"
          style={styles.fontMedium}
        />
    </View>

  _getStartDate = startDate => this.setState({ startDate })

  _getStartWeight = startWeight => this.setState({ startWeight })

  _getCurrentDate = currentDate => this.setState({ currentDate })

  _getCurrentWeight = currentWeight => this.setState({ currentWeight })

  _saveToDB = () => {
    const { startDate, startWeight, currentDate, currentWeight } = this.state
    const { user } = this.props.screenProps
    if (startDate && startWeight && currentDate && currentWeight) {
      firebase.database().ref(`/users/${user.uid}/weight`).set([
        {
          date: startDate,
          weight: startWeight,
        },
        {
          date: currentDate,
          weight: currentWeight,
        }
      ])
      this.props.navigation.navigate('Home')
    } else {
      Alert.alert('Please enter all fields');
    }
  }
}
