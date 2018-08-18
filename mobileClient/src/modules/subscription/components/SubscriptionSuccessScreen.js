'use strict'

import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  PixelRatio,
} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { SubscriptionPropTypes } from './propTypes'

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
  value: {
    fontSize: 16,
    color: '#444',
    alignSelf: 'flex-start',
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
})

export class SubscriptionSuccessScreen extends PureComponent {

  static navigationOptions = {
    title: 'Subscription Created'
  }

  static propTypes = {
    subscription: PropTypes.shape(SubscriptionPropTypes),
  }

  static defaultProps = {
    subscription: {},
  }

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
            <Text style={styles.value}>{duration} Days</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{moment(dob).format('MM/DD/YYYY')}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>{`Total cost for ${duration} days`}</Text>
            <Text style={styles.value}>${price}</Text>
          </ScrollView>
        </View>
      </View >
    )
  }
}
