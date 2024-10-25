require('dotenv').config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User',
      required: true
  },
  balance: {
      type: Number,
      required: true
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User,
  Account
};