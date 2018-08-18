'use strict'

import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  SegmentedControlIOS,
  ScrollView,
  TextInput,
  PixelRatio,
  Button,
  DatePickerIOS,
} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { SubscriptionPropTypes } from './propTypes'
import {
  price_url,
  subscription_url,
} from '../../../config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vehicleDesc: {
    color: '#3b5ca0',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
  img: {
    height: 214,
  },
  reservationContainer: {
    flex: 1,
    padding: 8,
  },
  label: {
    fontSize: 14,
    color: '#3b5ca0',
    alignSelf: 'flex-start',
    fontWeight: '500',
    marginTop: 8,
  },
  separator: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCDAA',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#CDCDCDDD',
    height: 30,
    width: '100%',
    paddingLeft: 8,
    justifyContent: 'center',
  },
  price: {
    paddingTop: 4,
    fontSize: 24,
    color: '#444',
    height: 40,
  }
})

export class SubscriptionEntryScreen extends PureComponent {

  static navigationOptions = {
  }

  static propTypes = {
    subscription: PropTypes.shape(SubscriptionPropTypes),
    updateLocalSubscription: PropTypes.func,
    createSubscription: PropTypes.func,
  }

  static defaultProps = {
    updateLocalSubscription: () => { },
    createSubscription: () => { },
  }

  componentDidMount() {
    const subscription = this.props.subscription
    const {
      duration,
      vin,
    } = subscription

    fetch(`${price_url}/?vin=${vin}&subscriptionLength=${duration}`)
      .then(rsp => rsp.json())
      .then(({ price }) => this.updateLocalSubscription({
        ...subscription,
        price,
      }))
  }

  createSubscription = () => {
    const {
      navigation,
      subscription,
      selected: vin,
    } = this.props

    fetch(subscription_url, {
      method: 'post',
      body: JSON.stringify({
        ...subscription,
        vin,
      }),
    })
      .then(rsp => rsp.json())
      .then(d => {
        if (d.error) return alert(d.error)
        //TODO: Implement SubscriptionSuccess UI and nav to it here
      })
      .catch(e => alert(e))
  }

  // ---- These are debounced so the state is not updated with each keystroke ----

  setName = _.debounce(name => this.updateLocalSubscription({
    ...this.props.subscription,
    name,
  }), 500)

  setEmail = _.debounce(email => this.updateLocalSubscription({
    ...this.props.subscription,
    email,
  }), 500)

  setDob = _.debounce(dob => this.updateLocalSubscription({
    ...this.props.subscription,
    dob,
  }), 500)

  setDuration = e => {
    const duration = e.nativeEvent.selectedSegmentIndex === 0 ? 7 : 28
    const subscription = this.props.subscription

    fetch(`${price_url}/?vin=${subscription.vin}&subscriptionLength=${duration}`)
      .then(rsp => rsp.json())
      .then(({ price }) => this.updateLocalSubscription({
        ...subscription,
        duration,
        price,
      }))
  }

  updateLocalSubscription = d => this.props.updateLocalSubscription(d)

  render() {
    const {
      vehicles,
      subscription: {
        vin,
        duration,
        name,
        email,
        dob,
        price,
      },
    } = this.props
    const {
      year,
      make,
      model,
      thumbnail,
    } = (vehicles.find(d => d.vin === vin) || {})

    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.img} source={{ uri: `${thumbnail}` }} />
          <View style={styles.textContainer}>
            <Text style={styles.vehicleDesc}>{`${year} ${make} ${model}`}</Text>
          </View>
        </View>
        <View style={styles.reservationContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.label}>Subscription Length</Text>
            <SegmentedControlIOS
              values={['7 Days', '28 Days']}
              selectedIndex={duration !== 28 ? 0 : 1}
              onChange={this.setDuration}
            />
            <View style={styles.separator} />
            <Text style={styles.label}>Price</Text>
            <Text style={styles.price}>${price}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={{ height: 40 }}
              value={name}
              onChangeText={this.setName}
            />
            <View style={styles.separator} />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={{ height: 40 }}
              value={email}
              onChangeText={this.setEmail}
            />
            <View style={styles.separator} />
            <Text style={styles.label}>Date of Birth</Text>
            <DatePickerIOS
              mode={'date'}
              date={dob}
              maximumDate={moment().subtract(21, 'years').toDate()}
              onDateChange={this.setDob}
            />
          </ScrollView>
        </View>
        <Button
          onPress={this.createSubscription}
          title="Reserve"
          color="#3b5ca0"
        />
      </View >
    )
  }
}
