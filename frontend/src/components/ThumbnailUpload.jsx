import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import axiosConfig from "../api/axiosConfig";
import { toast } from "react-toastify";

const ThumbnailUpload = ({ thumbnail, onUpload, isFileUploaded, cId }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      isFileUploaded(true);
    }
    e.target.value = "";
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await handleFileUpload(selectedFile);
      isFileUploaded(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    isFileUploaded(false);
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");
      const res = await axiosConfig.post(`/api/images/upload-thumbnail/${cId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        onUpload(res.data.imageUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
        toast.success("Thumbnail picture updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to update thumbnail picture.");
    }
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <div
        className="w-full max-w-lg h-56 aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer relative"
        onClick={handleClick}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Thumbnail Preview"
            className="object-cover w-full h-full"
          />
        ) : thumbnail ? (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="text-gray-500 text-sm">No image selected</p>
        )}

        {/* Upload icon overlay */}
        <div className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md">
          <FaUpload size={16} />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Upload / Cancel buttons */}
      {selectedFile && (
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            className="px-4 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
          >
            Upload
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-1 bg-gray-400 text-white text-sm rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
