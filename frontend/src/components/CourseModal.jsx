import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import IconSelect from "./IconSelect";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import { formatDateForInput } from "../constants/helperMethods";
import ThumbnailUpload from "./ThumbnailUpload";

const CourseModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
  cId = ""
}) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    category: "",
    originalPrice: "",
    offeredPrice: "",
    duration: "",
    startDate: "",
    endDate: "",
    isActive: true,
    thumbnail: "",
    instructor: "",
    level: "",
    whatYouLearn: [""],
    requirements: [""],
    highlights: [""],
    courseContent: [{ section: "", lectures: [{ title: "", duration: "" }] }],
  });

  useEffect(() => {
    if (initialData) setFormData({ ...initialData });
  }, [initialData, isOpen]);

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSectionChange = (index, value) => {
    const updated = [...formData.courseContent];
    updated[index].section = value;
    setFormData((prev) => ({ ...prev, courseContent: updated }));
  };

  const handleLectureChange = (sectionIndex, lectureIndex, field, value) => {
    const updated = [...formData.courseContent];
    updated[sectionIndex].lectures[lectureIndex][field] = value;
    setFormData((prev) => ({ ...prev, courseContent: updated }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      courseContent: [
        ...prev.courseContent,
        { section: "", lectures: [{ title: "", duration: "" }] },
      ],
    }));
  };

  const removeSection = (index) => {
    const updated = formData.courseContent.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, courseContent: updated }));
  };

  const addLecture = (sectionIndex) => {
    const updated = [...formData.courseContent];
    updated[sectionIndex].lectures.push({ title: "", duration: "" });
    setFormData((prev) => ({ ...prev, courseContent: updated }));
  };

  const removeLecture = (sectionIndex, lectureIndex) => {
    const updated = [...formData.courseContent];
    updated[sectionIndex].lectures = updated[sectionIndex].lectures.filter(
      (_, i) => i !== lectureIndex
    );
    setFormData((prev) => ({ ...prev, courseContent: updated }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      icon: "",
      category: "",
      originalPrice: "",
      offeredPrice: "",
      duration: "",
      startDate: "",
      endDate: "",
      isActive: true,
      thumbnail: "",
      instructor: "",
      level: "",
      whatYouLearn: [""],
      requirements: [""],
      highlights: [""],
      courseContent: [{ section: "", lectures: [{ title: "", duration: "" }] }],
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl py-6 px-8 relative overflow-y-auto max-h-[90vh]"
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
            <div className="mt-4 space-y-6">
              {/* Basic Info */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">Basic Info</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-3 md:col-span-2">
                    <CustomInput
                      label="Course Title"
                      value={formData.title}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, title: value }))
                      }
                    />
                  </div>
                  <IconSelect
                    label="Course Icon"
                    value={formData.icon}
                    onChange={(icon) =>
                      setFormData((prev) => ({ ...prev, icon }))
                    }
                  />
                </div>
                <CustomInput
                  label="Description"
                  type="textarea"
                  minNumRows={3}
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, description: value }))
                  }
                />
              </div>

              {/* Schedule & Instructor */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">
                  Schedule & Instructor
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <CustomSelect
                    label="Category"
                    options={[
                      { value: "web-development", label: "Web Development" },
                      { value: "data-science", label: "Data Science" },
                      { value: "graphic-design", label: "Graphic Design" },
                    ]}
                    value={formData.category}
                    onChange={(category) =>
                      setFormData((prev) => ({ ...prev, category }))
                    }
                  />
                  <div className="flex items-center gap-3">
                    <CustomInput
                      label="Original Price ($)"
                      value={formData.originalPrice}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          originalPrice: value,
                        }))
                      }
                    />
                    <CustomInput
                      label="Offered Price ($)"
                      value={formData.offeredPrice}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          offeredPrice: value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <CustomInput
                    label="Duration (weeks)"
                    type="number"
                    value={formData.duration}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, duration: value }))
                    }
                  />
                  <CustomInput
                    label="Instructor"
                    value={formData.instructor}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, instructor: value }))
                    }
                  />
                </div>
              </div>

              {/* Level & Dates */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">Level & Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <CustomSelect
                    label="Level"
                    options={[
                      { value: "beginner", label: "Beginner" },
                      { value: "intermediate", label: "Intermediate" },
                      { value: "advanced", label: "Advanced" },
                    ]}
                    value={formData.level}
                    onChange={(level) =>
                      setFormData((prev) => ({ ...prev, level }))
                    }
                  />
                  <div className="flex items-center gap-3">
                    <CustomInput
                      label="Start Date"
                      type="date"
                      value={formatDateForInput(formData.startDate)}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, startDate: value }))
                      }
                    />
                    <CustomInput
                      label="End Date"
                      type="date"
                      value={formatDateForInput(formData.endDate)}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, endDate: value }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Fields */}
              {["whatYouLearn", "requirements", "highlights"].map((field) => (
                <div key={field} className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-3">
                    {field === "whatYouLearn"
                      ? "What You’ll Learn"
                      : field === "requirements"
                        ? "Requirements"
                        : "Highlights"}
                  </h3>
                  {formData[field].map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <CustomInput
                        value={item}
                        onChange={(value) => handleArrayChange(field, i, value)}
                        className="flex-1"
                      />
                      {formData[field].length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(field, i)}
                          className="p-2 h-fit mt-1 bg-red-500 text-white rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(field)}
                    className="text-sm text-blue-600"
                  >
                    + Add {field}
                  </button>
                </div>
              ))}

              {/* Course Content */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">Course Content</h3>
                {formData.courseContent.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="border rounded-lg p-3 mb-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <CustomInput
                        label={`Section ${sectionIndex + 1} Title`}
                        value={section.section}
                        onChange={(value) =>
                          handleSectionChange(sectionIndex, value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="ml-2 p-2 mt-6 bg-red-500 text-white rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    {section.lectures.map((lecture, lectureIndex) => (
                      <div
                        key={lectureIndex}
                        className="grid grid-cols-3 gap-4 mb-2 items-end"
                      >
                        <div className="col-span-2">
                          <CustomInput
                            label={`Lecture ${lectureIndex + 1} Title`}
                            value={lecture.title}
                            onChange={(value) =>
                              handleLectureChange(
                                sectionIndex,
                                lectureIndex,
                                "title",
                                value
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <CustomInput
                            label={`Lecture ${lectureIndex + 1} Duration`}
                            value={lecture.duration}
                            placeholder="e.g., 10:30m, 40s, 1hr"
                            onChange={(value) =>
                              handleLectureChange(
                                sectionIndex,
                                lectureIndex,
                                "duration",
                                value
                              )
                            }
                          />
                          {section.lectures.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeLecture(sectionIndex, lectureIndex)
                              }
                              className="p-2 h-fit mt-6 bg-red-500 text-white rounded"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLecture(sectionIndex)}
                      className="text-sm text-blue-600"
                    >
                      + Add Lecture
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSection}
                  className="text-sm text-blue-600"
                >
                  + Add Section
                </button>
              </div>

              {/* Status & Thumbnail */}
              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-3">
                  Status & Thumbnail
                </h3>
                <div className="flex items-center gap-4 mb-4">
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
                    className={`w-14 h-7 flex items-center rounded-full p-1 transition ${formData.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${formData.isActive ? "translate-x-7" : ""
                        }`}
                    />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <ThumbnailUpload
                    thumbnail={formData.thumbnail}
                    onUpload={(url) => setFormData((prev) => ({ ...prev, thumbnail: url }))}
                    isFileUploaded={(fileStatus) => setFileUploaded(fileStatus)}
                    cId={cId}
                  />
                </div>
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
                <motion.button
                  disabled={fileUploaded}
                  type="button"
                  onClick={handleSubmit}
                  className={`px-4 py-2 cursor-help ${fileUploaded ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg text-sm`}
                >
                  {mode === "create" ? "Create Course" : "Save Changes"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseModal;
