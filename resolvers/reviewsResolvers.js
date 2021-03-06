const Books = require("./../models/booksModel");
const User = require("./../models/usersModel");
const Reviews = require("./../models/reviewsModel");


module.exports = {
  Query: {
    getReviews: async(root, args, ctx) => {
      const reviews = await Reviews.find();
      return reviews;
    },
    getReviewsById: async(root, args, ctx) => {
      const review = await Reviews.findById(args.reviewId);
      return review;
    },
    getReviewsBy: async(root, args, ctx) => {
      const review = await Reviews.findBy({[args.param]: args.value})
      console.log(review)
      return review;
    }
  },

  Review: {
    user_id: async(root, args, ctx, info) => {
      const user = await User.findById(root.user_id);
      return user;
    },
    book_id: async(root, args, ctx, info) => {
      const books = await Books.findById(root.book_id);
      return books;
    }
  },

  Mutation: {
    addReview: async(root, args, ctx) =>{
      const review = await Reviews.add(args.input);
      return review;
    },
    editReview: async(root,args, ctx) => {
      const review = await Reviews.edit(args.id, args.input);
      return review;
    },
    deleteReview: async(root, args, ctx) => {
      const count = await Reviews.remove(args.id);
      return count;
    }
  }
}
