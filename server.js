import express from 'express'
import { MongoClient } from 'mongodb'
import { movieRouter } from './routes/moviePost.js'
import { userRouter } from './routes/login.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT
app.use(express.json())

app.use('/user', userRouter)
app.use('/movies', movieRouter)

export async function createConnection () {
  const MONGO_URL = process.env.MONGO_URI
  const client = new MongoClient(MONGO_URL)

  try {
    await client.connect()
    return client
  } catch (err) {
    console.log(err)
  }
}

app.get('/', (req, res) => {
  res.send('Welcome to my app')
})

app.listen(PORT, () => console.log('Successfully Connected', PORT))
