const express = require('express')
const path = require('path')
const http = require('http')

const publicPath = path.join(__dirname, '../build')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static(publicPath))

app.all('*', (req,res) => res.sendFile(path.join(publicPath, 'index.html')))

const server = http.createServer(app)

server.listen(process.env.PORT || 3000, console.log('Prod server is running'))