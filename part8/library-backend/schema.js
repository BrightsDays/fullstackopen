const { gql } = require('apollo-server')

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Genre {
    name: String!
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: String!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [Genre!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, born: String!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  fragment BookDetails on Book {
    name
    phone
    address {
      street
      city
    }
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
