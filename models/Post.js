const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    image: String,
    isProfilePost: {
      type: Boolean,
      default: false,
    },

    profilePostData: {
      coverImage: String,
      profileImage: String,
    },

    privacy: {
      type: String,
      enum: ['Only me', 'Public'],
      default: 'Public',
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    hearts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
)

module.exports = model('Post', postSchema)