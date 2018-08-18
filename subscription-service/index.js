const { send, json } = require('micro')
const { router, post } = require('microrouter')
const { isEmpty } = require('lodash')

//Fake DB. Key is a generated subscription id (just an increment for this challenge)
const db = {}
let nextId = 1

module.exports = router(
  post('/', async (req, res) => {
    const subscription = await json(req)

    //Basic validation. Would be better to use some sort of schema validation like joi for prod
    if (isEmpty(subscription.name)) {
      return send(res, 400, { error: 'Name is required' })
    }
    if (isEmpty(subscription.email)) {
      return send(res, 400, { error: 'Email is required' })
    }
    if (isEmpty(subscription.dob)) {
      return send(res, 400, { error: 'Date of Birth is required' })
    }
    if (subscription.duration !== 7 && subscription.duration !== 28) {
      return send(res, 400, { error: 'Invalid subscription length' })
    }
    if (isEmpty(subscription.vin)) {
      return send(res, 400, { error: 'A vehicle is required' })
    }

    //Add an id and persist to fake db
    subscription.id = nextId++
    db[subscription.id] = subscription

    return { subscription }
  })
)
