const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

const Router = require('../routes/Routes')
app.use('/api',Router)

// Server static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


module.exports = app;