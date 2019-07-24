const BooksOwned = require("./../models/booksOwnedModel");
const Users = require("./../models/usersModel");
const Books = require("./../models/booksModel");

module.exports = {
  Query: {
    getBooksOwnedByUser: async(root, args, ctx) => {
      const booksOwned = await BooksOwned.getBooksByUserId(args.id);
      console.log('boowsOwned', booksOwned);
      return booksOwned;
    }
  },

  BooksOwned: {
    user_id: async(root, args, ctx) => {
      const user = await Users.findById(root.user_id);
      return user;
    },
    book_id: async(root, args, ctx) => {
      const book = await Books.findById(root.book_id);
      return book;
    }
  },

  Mutation: {
    addBooksOwned: async(root, args, ctx) =>{
      const addedBook = await BooksOwned.add(args.input);
      return addedBook
    },
    deleteBooksOwned: async(root, args, ctx) => {
      const deletedBook = await BooksOwned.remove(args.input);
      return deletedBook;
    }
  }
}
