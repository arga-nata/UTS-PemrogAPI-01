const produkRoutes = require('./produkRoutes')

const route = require('express').Router()
const kategoriRoute = require('./kategoriRoutes')

route.use('/api', route)

route.use('/produk', produkRoutes)
route.use('/kategori', kategoriRoute)

module.exports = route