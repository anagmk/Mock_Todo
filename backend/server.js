import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import todoRoutes from './routes/todo.routes.js'

const PORT = process.env.PORT || 3000

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/todos', todoRoutes)


app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
})