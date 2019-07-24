const BooksRead = require("./../models/booksReadModel");
const Users = require("./../models/usersModel");
const Books = require("./../models/booksModel");

module.exports = {
  Query: {
    getBooksRead: async(root, args, ctx) => {
      const booksRead = await BooksRead.getBooksByUserId(args.id);
      return booksRead;
    }
  },

  BooksRead:{
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
    addBooksRead: async(root, args, ctx) =>{
      const addedBook = await BooksRead.add(args.input);
      return addedBook
    },
    deleteBooksRead: async(root, args, ctx) => {
      const deletedBook = await BooksRead.remove(args.input);
      return deletedBook;
    }
  }
}
