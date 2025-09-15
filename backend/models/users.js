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

  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
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

  profilePic: {
    data: Buffer,
    contentType: String,
  },

  createdAt:{
    type:Date,
    default:new Date()
  }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;