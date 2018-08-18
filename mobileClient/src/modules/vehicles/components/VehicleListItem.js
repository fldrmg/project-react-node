'use strict'

import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'
import { PropTypes } from 'prop-types'
import { VehiclePropTypes } from './propTypes'

const styles = StyleSheet.create({
  container: {
    height: 230,
    padding: 8,
  },
  textContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#CDCDCDDD',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 30,
    width: '100%',
    paddingLeft: 8,
    justifyContent: 'center',
  },
  text: {
    color: '#3b5ca0',
    fontSize: 16,
    fontWeight: '500',
  },
  img: {
    flex: 1,
    borderRadius: 8,
  }
})

export class VehicleListItem extends PureComponent {

  static propTypes = {
    ...VehiclePropTypes,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    onPress: () => { }
  }

  onPress = () => this.props.onPress(this.props.vin)

  render() {
    const {
      make,
      model,
      year,
      thumbnail,
    } = this.props

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <Image style={styles.img} source={{ uri: `${thumbnail}` }} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{`${year} ${make} ${model}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
