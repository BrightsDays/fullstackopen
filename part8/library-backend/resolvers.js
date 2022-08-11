const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const Genre = require('./models/genre')

const JWT_SECRET = 'secret_key'

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.name })
      return books.length
    },
  },
  Genre: {
    bookCount: async (root) => {
      const books = await Book.find({ genres: { $in: [root.name] } })
      console.log(root.name)
      return books.length
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }

      if (!args.genre && args.author) {
        return Book.find({ author: args.author })
      }
      if (!args.author && args.genre) {
        return Book.find({ genres: { $in: [args.genre] } })
      }

      return Book.find({ author: args.author, genres: { $in: [args.genre] } })
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => Genre.find({}),
    me: async (root, args, { currentUser }) => {
      return currentUser[0]
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authentificated')
      }

      const book = new Book({ ...args })
      const author = await Author.find({ name: args.author })

      args.genres.forEach(async (item) => {
        const genre = await Genre.find({ name: item })

        if (!genre.length) {
          const genre = new Genre({ name: item })

          try {
            await genre.save()
          } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
          }
        }
      })

      if (!author.length) {
        const author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authentificated')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })
      const favouriteGenre = await Genre.find({ name: args.favouriteGenre })

      if (!favouriteGenre.length) {
        const genre = new Genre({ name: args.favouriteGenre })

        try {
          await genre.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user && args.password !== 'qwerty') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

module.exports = resolvers
