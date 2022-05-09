export async function getMoviePost (client) {
  const result = await client
    .db('movies')
    .collection('overview')
    .find()
    .toArray()
  console.log('Successfully Connected', result)
  return result
}
export async function getMoviePostById (client, id) {
  const result = await client
    .db('movies')
    .collection('overview')
    .findOne({ id: id })
  console.log('Successfully Connected', result)
  return result
}
export async function postMovie (client, newMovie) {
  const result = await client
    .db('movies')
    .collection('overview')
    .insertMany(newMovie)
  console.log('Successfully Inserted', result)
}
export async function updatePostById (client, id, editMovie) {
  const result = await client
    .db('movies')
    .collection('overview')
    .updateOne({ id: id }, { $set: { editMovie } })
  console.log('Successfully updated', result)
  return result
}
export async function deletePostById (client, id) {
  const result = await client
    .db('movies')
    .collection('overview')
    .deleteOne({ id: id })
  console.log('Successfully Deleted', result)
  return result
}

export async function createUser (client, newUser) {
  const result = await client
    .db('movies')
    .collection('user')
    .insertOne(newUser)
  console.log('Successfully Inserted', result)
}
export async function getUsers (client) {
  const result = await client
    .db('movies')
    .collection('user')
    .find()
    .toArray()
  console.log('Successfully Connected', result)
  return result
}

export async function getUser (client, filter) {
  const result = await client
    .db('movies')
    .collection('user')
    .findOne(filter)
  console.log('Successfully Connected', result)
  return result
}
