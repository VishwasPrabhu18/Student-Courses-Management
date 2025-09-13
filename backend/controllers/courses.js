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

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await CoursesModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await CoursesModel.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};