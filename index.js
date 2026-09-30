const express = require("express")
const app = express()
const pRoutes = require('./routes/productRoutes')
const cacher = require('./middleware/cache')

app.use(express.json())

app.use(cacher)
app.use('/products', pRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})