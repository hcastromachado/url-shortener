const express = require('express');
const app = express();
const router = express.Router()
const path = require('path')
const urls = require('./urls')


router.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, '../../public/index.html'))
})

module.exports = router