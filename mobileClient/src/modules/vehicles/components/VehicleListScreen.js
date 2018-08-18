'use strict'

import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { VehicleList } from './VehicleList'
import { vehicle_url } from '../../../config'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export class VehicleListScreen extends PureComponent {

  static navigationOptions = {
    title: 'Get a Car',
  }

  static propTypes = {
    selectVehicle: PropTypes.func,
  }

  static defaultProps = {
    selectVehicle: () => { },
    setVehicles: () => { },
  }

  componentDidMount() {
    const {
      vehicles,
      setVehicles,
    } = this.props

    //Normally, this would go into a saga so that the UI remains dumb. Cheating here for this lab.
    vehicles.length || fetch(vehicle_url)
      .then(rsp => rsp.json())
      .then(({ vehicles }) => setVehicles(vehicles))
      .catch(e => console.warn('Vehicles not loaded'))
  }

  onRowPress = vehicle => {
    const {
      navigation,
      selectVehicle,
    } = this.props

    selectVehicle(vehicle.vin)
    navigation.push('SubscriptionEntry')
  }

  render() {
    const {
      vehicles,
    } = this.props

    return (
      <View style={styles.container}>
        <VehicleList vehicles={vehicles} onRowPress={this.onRowPress} />
      </View>
    )
  }
}
