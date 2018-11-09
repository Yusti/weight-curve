import React from 'react'
import { View, Button, TextInput, Text, TouchableOpacity, Alert } from 'react-native'

import * as firebase from 'firebase'

import styles from './styles'

export default class WeightCurveFirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      startWeight: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: "Weight curve",
      headerRight: <Button onPress={() => params._saveToDB()} title="Save" />,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ _saveToDB: this._saveToDB })
  }

  render() {
    const { startDate, startWeight, currentDate, currentWeight } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this._renderTextInput('Date', startDate, this._getStartDate)}
          {this._renderTextInput('Weight', startWeight, this._getStartWeight)}
        </View>
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

  _saveToDB = () => {
    const { startDate, startWeight, currentDate, currentWeight } = this.state
    const { user } = this.props.screenProps
    if (startDate && startWeight) {
      firebase.database().ref(`/users/${user.uid}/weight`).push({
        date: startDate,
        weight: startWeight,
      });
      this.props.navigation.navigate('WeightScreen')
    } else {
      Alert.alert('Please enter all fields');
    }
  }
}
