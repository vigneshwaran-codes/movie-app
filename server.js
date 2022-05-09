import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { movieRouter } from './routes/moviePost.js'
import { userRouter } from './routes/login.js'

const app = express()
const PORT = process.env.PORT

dotenv.config()

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
