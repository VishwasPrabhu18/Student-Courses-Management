import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImagePickerModal from "./ImagePickerModal";

const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const CourseModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    isActive: true,
    thumbnail: "",
    instructor: "",
    level: "",
  });
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      price: "",
      duration: "",
      startDate: "",
      endDate: "",
      isActive: true,
      thumbnail: "",
      instructor: "",
      level: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl py-6 px-8 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">
                {mode === "create" ? "Create New Course" : "Edit Course"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <FormField label="Course Title">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  required
                />
              </FormField>

              <FormField label="Description">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-1.5 text-sm resize-none"
                  required
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Category">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-1.5 text-sm bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="web">Web Development</option>
                    <option value="design">Design</option>
                    <option value="data">Data Science</option>
                  </select>
                </FormField>
                <FormField label="Price ($)">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Duration (weeks)">
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  />
                </FormField>
                <FormField label="Instructor">
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-1.5 text-sm"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Level">
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-1.5 text-sm bg-white"
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </FormField>
                <FormField label="Dates">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-1.5 text-sm"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-1.5 text-sm"
                    />
                  </div>
                </FormField>
              </div>

              {/* Toggle */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={
                      formData.isActive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {formData.isActive ? "Active" : "Inactive"}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                    formData.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                      formData.isActive ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnail (at bottom, centered full row) */}
              <div className="flex flex-col items-center gap-3 mt-6">
                {formData.thumbnail ? (
                  <div className="w-full max-w-lg aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.thumbnail}
                      alt="thumbnail"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No image selected</p>
                )}
                <button
                  type="button"
                  onClick={() => setImagePickerOpen(true)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Select Thumbnail
                </button>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  {mode === "create" ? "Create Course" : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
      <ImagePickerModal
        isOpen={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(url) => setFormData((prev) => ({ ...prev, thumbnail: url }))}
      />
    </AnimatePresence>
  );
};

export default CourseModal;
