'use strict';
require('dotenv').config()
const app = require('./app');

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME

app.listen(PORT, HOSTNAME, () => {
    console.log('Server is listening at: '+HOSTNAME+':'+PORT)
  })