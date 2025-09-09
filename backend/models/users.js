import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowerCase: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  role: {
    type: String,
    default: "user"
  },

  createdAt:{
    type:Date,
    default:new Date()
  }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;