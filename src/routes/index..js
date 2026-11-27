const produkRoutes = require('./produkRoutes')

const route = require('express').Router()

route.use('/api', route)

route.use('/produk', produkRoutes)

module.exports = route