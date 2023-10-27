const express = require('express');
const app = express();
const connectDb = require('./config/db')
const port = 3333
app.use(express.json())
const createUrl = require('./routes/urls')
const cors = require('cors')

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))


app.use(createUrl)


app.listen(port, () => {
    console.log(`Server is running on port address: http://localhost:${port}/`)
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDb()

// http://localhost:3333/short