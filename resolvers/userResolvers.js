const { AuthenticationError } = require("apollo-server");

const User = require("./../models/usersModel");
const Reviews = require("./../models/reviewsModel");
const BooksOwned = require("./../models/booksOwnedModel");
const FavoriteBooks = require("./../models/favoriteBooksModel");
const BooksRead = require("./../models/booksReadModel");
const BooksBorrowed = require("./../models/booksBorrowedModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser){
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getCurrentUser: authenticated((root, args, ctx) => ctx.currentUser),

    getUsers: async (root, args, ctx) => {
      const users = await User.find();
      return users;
    },

    getUserById: async(root, args, ctx) => {
      const user = await User.findById(args.userId);
      return user;
    },

    getUserBy: async(root, args, ctx) => {
      const user = await User.findBy({[args.param]: args.value });
      return user[0];
    },

    getBooksOwnedByUserId: async(root, args, ctx) => {
      const user = await BooksOwned.getBooksByUserId(args.userId);
      return user;
    },
    getFavoriteBooksByUserId: async(root, args, ctx) => {
      const user = await FavoriteBooks.getBooksByUserId(args.userId);
      return user;
    },
    getBooksReadByUserId: async(root, args, ctx) => {
      const user = await BooksRead.getBooksByUserId(args.userId);
      return user;
    },
    getBooksLoanedByOwner: async(root, args, ctx) => {
      const user = await BooksBorrowed.getBooksByOwner(args.userId);
      return user;
    },
    getBooksBorrowedByBorrower: async(root, args, ctx) => {
      const user = await BooksBorrowed.getBooksByBorrower(args.userId);
      return user;
    },
    getReviewsByUserId: async(root, args, ctx) => {
      const user = await Reviews.findBy({ user_id: args.userId});
      return user;
    }
  },

  User: {
    reviews: async(root, args, ctx, info) => {
      const reviews = await Reviews.findBy({ user_id: root_id});
      return reviews;
    },
    booksOwned: async(root, args, ctx, info) => {
      const booksOwned = await BooksOwned.getBooksByUserId(root.id);
      return booksOwned;
    },
    booksRead: async(root, args, ctx, info) => {
      const booksRead = await BooksRead.getBooksByUserId(root.id);
      return booksRead;
    },
    favoriteBooks: async(root, args, ctx, info) => {
      const favoriteBooks = await FavoriteBooks.getBooksByUserId(root.id);
      return favoriteBooks;
    },
    booksLoaned: async(root, args, ctx, info) => {
      const booksLoaned = await BooksBorrowed.getBooksByOwner(root.id);
      return booksLoaned;
    },
    booksBorrowed: async(root, args, ctx, info) => {
      const booksBorrowed = await BooksBorrowed.getBooksByBorrower(root.id);
      return booksBorrowed;
    }
  },

  Mutation: {
    addUser: async(root, args, ctx) => {
      const newUser = await User.add(args.input);
      return newUser;
    },
    updateUser: async(root, args, ctx) => {
      const user = await User.edit(args.id, args.input);
      return user;
    },
    deleteUser: async(root, args, ctx) => {
      const user = await User.remove(args.id);
      return count;
    }
  }
};
