import express from 'express'
import {
  getMoviePost,
  postMovie,
  updatePostById,
  deletePostById,
  getMoviePostById
} from '../db.js'
import { createConnection } from '../server.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router
  .route('/')
  .get(async (req, res) => {
    const client = await createConnection()
    const moviePosts = await getMoviePost(client)
    res.send(moviePosts)
    console.log(moviePosts)
  }).post(async (req, res) => {
    const client = await createConnection()
    const newMovie = req.body
    const insertPost = await postMovie(client, newMovie)
    res.send(insertPost)
  })

router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id
    const client = await createConnection()
    const moviePost = await getMoviePostById(client, +id)
    res.send(moviePost)
  }).patch(auth, async (req, res) => {
    const id = req.params.id
    const client = await createConnection()
    const editMovie = req.body
    const updatePost = await updatePostById(client, editMovie, +id)
    res.send(updatePost)
  }).delete(auth, async (req, res) => {
    const id = req.params.id
    const client = await createConnection()
    const deletePost = await deletePostById(client, +id)
    res.send(deletePost)
  })

export const movieRouter = router
