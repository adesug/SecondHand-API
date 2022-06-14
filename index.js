const express = require('express')
const app = express()
const port = 3000
const routes = require('./src/routes/index')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)

app.listen(port,() => {
    console.log(`server running ${port}`)
})