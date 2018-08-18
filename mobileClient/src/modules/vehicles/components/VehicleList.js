'use strict'

import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import { VehiclePropTypes } from './propTypes'
import { VehicleListItem } from './VehicleListItem'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
})

export class VehicleList extends PureComponent {

  static propTypes = {
    onRowPress: PropTypes.func,
    vehicles: PropTypes.arrayOf(PropTypes.shape(VehiclePropTypes)),
  }

  static defaultProps = {
    onRowPress: () => { },
    vehicles: [],
  }

  keyExtractor = d => d.vin

  onRowPress = vin => this.props.onRowPress(this.props.vehicles.find(d => d.vin === vin))

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.vehicles}
          keyExtractor={this.keyExtractor}
          renderItem={d => <VehicleListItem {...d.item} onPress={this.onRowPress} />}
        />
      </View>
    )
  }
}
