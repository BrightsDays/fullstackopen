const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const resolvers = require('./resolvers')
const { typeDefs } = require('./typeDefs')
const User = require('./models/user')

const MONGO_URI =
  'mongodb+srv://brightsdayss:WK32sh0p@cluster0.yzdswio.mongodb.net/library?retryWrites=true&w=majority'

const JWT_SECRET = 'secret_key'

console.log('connecting to', MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.find({ username: decodedToken.username })

      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
