require('dotenv').config({});
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes/index')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(port,() => {
    console.log(`server running ${port}`)
})