import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

const PORT = process.env.PORT ||3000

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})


app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
})