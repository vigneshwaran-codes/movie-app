import express from 'express'
import { createConnection } from '../server.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, getUsers, getUser } from '../db.js'

const router = express.Router()

router.route('/').get(async (req, res) => {
  const client = await createConnection()
  const users = await getUsers(client, {})
  res.send(users)
})

router.route('/signup').post(async (req, res) => {
  const { username, password } = req.body
  const client = await createConnection()
  const hashedPassword = await genPassword(password)
  const newUser = await createUser(client, {
    username: username,
    password: hashedPassword
  })
  //   console.log(hashedPassword, newUser)
  res.send(newUser)
})

router.route('/login').post(async (req, res) => {
  const { username, password } = req.body
  const client = await createConnection()
  const user = await getUser(client, { username: username })
  console.log(user)
  const inDbStorePassword = user.password
  const isPasswordMatch = await bcrypt.compare(password, inDbStorePassword)
  if (!isPasswordMatch) {
    res.send({ message: 'Invalid Login' })
  } else {
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY)
    res.send({ message: 'Successfully Login', token: token })
  }
})
export const userRouter = router

async function genPassword (passcode) {
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(passcode, salt)
  return hashedPassword
}
genPassword('password@123')
