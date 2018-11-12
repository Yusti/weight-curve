import React from 'react'
import { View, Button, Text } from 'react-native'
import { Facebook } from 'expo'
import moment from 'moment'

import * as firebase from 'firebase'

import styles from './styles'

import config from '../../../config/default.json'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { user } = this.props.screenProps

    if (user === undefined) {
      return null
    }

    if (user === null) {
      return (
        <View style={styles.container}>
          <Button
            style={styles.button}
            title="Login"
            onPress={this._loginWithFacebook}
          />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>{user.displayName}</Text>

        <Button style={styles.button} title="Logout" onPress={this._logout} />
        <Button
          style={styles.button}
          title="Weight Curve"
          onPress={this._navigateToWeightCurves}
        />
      </View>
    )
  }

  _loginWithFacebook = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        config.FACEBOOK_APP_ID,
        {
          permissions: ['public_profile', 'email'],
        }
      )

      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        const userFirebaseAuthProfile = await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)

        if (userFirebaseAuthProfile.additionalUserInfo.isNewUser) {
          const user = {
            id: userFirebaseAuthProfile.user.uid,
            name: userFirebaseAuthProfile.user.displayName,
            email: userFirebaseAuthProfile.user.email,
            picture: userFirebaseAuthProfile.additionalUserInfo.profile.picture
              ? {
                  uri:
                    userFirebaseAuthProfile.additionalUserInfo.profile.picture
                      .data.url,
                }
              : null,
            dueDate: moment()
              .add(266, 'days')
              .format('YYYY-MM-DD'),
          }
          await firebase
            .database()
            .ref(`/users/${user.id}`)
            .set(user)
        }
        console.info(
          'userFirebaseAuthProfile: ',
          JSON.stringify(userFirebaseAuthProfile, null, 4)
        )
      }
    } catch (error) {
      console.log('error', error)

      alert(error.message)
    }
  }

  _logout = () => firebase.auth().signOut()

  _navigateToWeightCurves = async () => {
    const { user } = this.props.screenProps
    const { navigation } = this.props
    firebase
      .database()
      .ref(`/weightCurvePointsByUser/${user.uid}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          navigation.navigate('WeightCurve')
        } else {
          navigation.navigate('WeightCurveFirst')
        }
      })
  }
}
