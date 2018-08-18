import * as actions from '../actions'
import * as components from '../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  ...state.vehicles,
  ...state.subscription,
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
})

export const SubscriptionSuccessScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(components.SubscriptionSuccessScreen)
