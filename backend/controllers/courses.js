import CoursesModel from "../models/courses.js";

export const getAllCourses = async (req, res) => {
  try {
    const coursesData = await CoursesModel.find();
    res.status(200).json(coursesData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const course = req.body;
  const newCourse = new CoursesModel(course);
  try {
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
