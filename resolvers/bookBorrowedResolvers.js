const BooksBorrowed = require("./../models/booksBorrowedModel");
const Users = require("./../models/usersModel");
const Books = require("./../models/booksModel");

module.exports = {
  Query: {
    getBooksBorrowedByOwner: async(root, args, ctx) => {
      const booksOwned = await BooksBorrowed.getBooksByOwner(args.id);
      return booksOwned;
    },
    getBooksBorrowedByBorrowerId: async(root, args,ctx) => {
      const booksBorrowed = await BooksBorrowed.getBooksByBorrower(args.id);
      return booksBorrowed;
    }
  },

  BooksBorrowed: {
    owner: async(root, args, ctx) => {
      const user = await Users.findById(root.owner);
      return user;
    },
    borrower: async(root, args, ctx) => {
      const user = await Users.findById(root.borrower);
      return user;
    },
    book_id: async(root, args, ctx) => {
      const book = await Books.findById(root.book_id);
      return book;
    }
  },
  Mutation: {
    addBooksBorrowed: async(root, args, ctx) =>{
      const addedBook = await BooksBorrowed.add(args.input);
      return addedBook
    },
    deleteBooksBorrowed: async(root, args, ctx) => {
      const deletedBook = await BooksBorrowed.remove(args.input);
      return deletedBook;
    }
  }
}
