const Books = require("./../models/booksModel");
const Reviews = require("./../models/reviewsModel");

module.exports ={
  Query: {
    getBooks: async(root, args, ctx) => {
      const books = await Books.find();
      return books;
    },
    getBookById: async(root, args, ctx) => {
      const book = await Books.findById(args.bookId);
      return food;
    },
    getBookBy: async(root, args, ctx) => {
      const book = await Books.findBy({[args.param]: args.value});
      return book;
    }
  },

  Book: {
    reviews: async(root, args, ctx, info) => {
      const reviews = await Reviews.findBy({book_id: root.id});
      return reviews;
    }
  },

  Mutation: {
    addBook: async(root, args, ctx) => {
      const book = await Books.add(args.input);
      return book;
    }
  }
}
