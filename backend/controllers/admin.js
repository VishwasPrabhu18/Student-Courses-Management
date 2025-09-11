import UserModel from "../models/users.js";

export const getUsers = async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllSudents = async (req, res) => {
  try {
    const userData = await UserModel.find({ role: "user" }).select("-password");
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
