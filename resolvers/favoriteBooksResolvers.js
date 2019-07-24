const FavoriteBooks = require("./../models/favoriteBooksModel");
const Users = require("./../models/usersModel");
const Books = require("./../models/booksModel");

module.exports = {
  Query: {
    getFavoriteBooks: async(root, args, ctx) => {
      const favoriteBooks = await FavoriteBooks.getBooksByUserId(args.id);
      return favoriteBooks;
    }
  },

  FavoriteBooks: {
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
    addFavoriteBook: async(root, args, ctx) =>{
      const addedBook = await FavoriteBooks.add(args.input);
      return addedBook
    },
    deleteFavoriteBook: async(root, args, ctx) => {
      const deletedBook = await FavoriteBooks.remove(args.input);
      return deletedBook;
    }
  }
}
