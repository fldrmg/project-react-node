const { send } = require('micro')
const { router, get } = require('microrouter')

//Fake vehicles db. Grabbed items from autotrader.com. Fake VIN/Odo.
const vehicles = [{
  vin: 'vin1',
  make: 'Nissan',
  model: 'Altima 2.5 S',
  year: 2015,
  thumbnail: 'https://images.autotrader.com/borderscaler/350/262/e6e6e6/hn/c/0cd664f70a304ac2a84e46a123cb3a17.jpg',
  odometer: 43125,
}, {
  vin: 'vin2',
  make: 'Nissan',
  model: 'Rogue S',
  year: 2016,
  thumbnail: 'https://images.autotrader.com/borderscaler/350/262/e6e6e6/hn/c/4614a60df9104b958d89b6c00f6a52a1.jpg',
  odometer: 64783,
}]

module.exports = router(
  get('/vehicles', (req, res) => {
    return {
      vehicles
    }
  })
)
