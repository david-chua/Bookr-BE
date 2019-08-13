const { gql } = require("apollo-server");

module.exports = gql`
  type Query{
    #//*Users
    getCurrentUser: User
    getUsers: [User!]!
    getUserById(userId: ID!): User
    getUserBy(param: String!, value: String!): User
    getBooksOwnedByUserId(userId: ID!): [BooksOwned]!
    getFavoriteBooksByUserId(userId: ID!): [FavoriteBooks]!
    getBooksReadByUserId(userId: ID!):[BooksRead]!
    getBooksLoanedByOwner(userId: ID!): [BooksBorrowed]!
    getBooksBorrowedByBorrower(userId: ID!): [BooksBorrowed]!
    getReviewsByUserId(userId: ID!): [Review]!

    #//*Books
    getBooks: [Book!]!
    getBookById(bookId: ID!): Book
    getBookBy(param: String!, value: String!): Book

    #//*Reviews
    getReviews: [Review!]!
    getReviewsById(reviewId: ID!): Review
    getReviewsBy(param: String!, value: String!): Review

    #//*BooksOwned
    getBooksOwnedByUser(id: ID!): [BooksOwned]

    #//*BooksRead
    getBooksRead(id: ID!): BooksRead

    #//*FavoriteBooks
    getFavoriteBooks(id: ID!): FavoriteBooks

    #//*BooksBorrowed
    getBooksBorrowedByOwner(id: ID!): BooksBorrowed
    getBooksBorrowedByBorrowerId(id: ID!): BooksBorrowed
  }

  type Mutation{
    #//*Users
    addUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    updatePassword(id: ID!, input: passwordInput!): User!
    deleteUser(id: ID!): Int!
    loginUser(input: LoginInput!): User
    registerUser(input: UserInput!): User

    #//*Books
    addBook(input: BookInput!): Book!

    #//*Reviews
    addReview(input: ReviewInput!): Review!
    editReview(id: ID!, input: ReviewInput!): Review!
    deleteReview(id: ID!): Int!

    #//*BooksOwned
    addBooksOwned(input: BooksOwnedInput!): BooksOwned
    deleteBooksOwned(input: DeleteBookInput!): Int!

    #//*BooksRead
    addBooksRead(input: BooksReadInput!): BooksRead
    deleteBooksRead(input: BooksReadInput!): Int!

    #//*FavoriteBooks
    addFavoriteBook(input: FavoriteBooksInput): FavoriteBooks
    deleteFavoriteBook(input: FavoriteBooksInput): Int!

    #//* BooksBorrowed
    addBooksBorrowed(input: BooksBorrowedInput): BooksBorrowed
    deleteBooksBorrowed(input: BooksBorrowedInput): Int!
  }

  type User {
    id: ID!
    username: String
    email: String!
    first_name: String
    last_name: String
    gender: String
    avatar: String
    userType: String
    password: String
    token: String
    reviews: [Review!]!
    booksOwned: [BooksOwned!]!
    booksRead: [BooksRead!]!
    favoriteBooks: [FavoriteBooks!]!
    booksLoaned: [BooksBorrowed!]!
    booksBorrowed: [BooksBorrowed!]!
  }

  type Book {
    id: ID!
    title: String!
    author: String
    publisher: String
    publish_date: String
    image: String
    book_api_id: String
    category: String
    description: String
    list_price: Float
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    content: String!
    rating: Float!
    user_id: User!
    book_id: Book!
  }

  type BooksOwned {
    user_id: User!
    book_id: Book!
    borrowed: Boolean!
  }

  type BooksRead {
    user_id: User!
    book_id: Book!
  }

  type FavoriteBooks{
    user_id: User!
    book_id: Book!
  }

  type BooksBorrowed{
    owner: User!
    borrower: User!
    book_id: Book!
  }

  input UserInput {
    username: String
    email: String!
    first_name: String
    last_name: String
    gender: String
    avatar: String
    userType: String
    password: String
  }

  input LoginInput{
    email: String!
    password: String!
  }

  input passwordInput{
    newPassword: String!
    oldPassword: String!
  }

  input BookInput {
    title: String!
    author: String
    publisher: String
    publish_date: String
    image: String
    book_api_id: String
    category: String
    description: String
    list_price: Float
  }

  input ReviewInput {
    content: String!
    rating: Float!
    user_id: ID!
    book_id: ID!
  }

  input BooksOwnedInput {
    user_id: ID!
    book_id: ID!
    borrowed: Boolean!
  }

  input DeleteBookInput{
    user_id: ID!
    book_id: ID!
  }

  input BooksReadInput{
    user_id: ID!
    book_id: ID!
  }

  input FavoriteBooksInput{
    user_id: ID!
    book_id: ID!
  }

  input BooksBorrowedInput{
    owner: ID!
    borrower: ID!
    book_id: ID!
  }
`;
