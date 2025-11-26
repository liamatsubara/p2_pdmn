require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const axios = require('axios')

app.use(cors());

 app.get('/search', async (req, res) => {
    const nasaClient = axios.create({
        baseURL: 'https://images-api.nasa.gov',
    })
    const result = await nasaClient.get('/search', {
        params: {
            q: req.query.q
        }
    })
    res.json({photos: result.data.collection.items})
 })

 const port = 3000
 app.listen(port, () => console.log(`Back. Porta ${port}.`))