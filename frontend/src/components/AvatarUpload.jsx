import { useRef, useState } from "react";
import { FaUser, FaCamera } from "react-icons/fa";

const AvatarUpload = ({ profilePic, onUpload }) => {
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
      setPreviewUrl(URL.createObjectURL(file)); // show preview
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile); // call parent API handler
      setSelectedFile(null);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28 cursor-pointer" onClick={handleClick}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-600 shadow-md object-cover"
          />
        ) : profilePic ? (
          <img
            src={profilePic}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-600 shadow-md object-cover"
          />
        ) : (
          <FaUser className="w-28 h-28 p-4 text-gray-300 rounded-full border-4 border-indigo-600 shadow-md" />
        )}

        {/* Camera icon overlay */}
        <div className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full shadow-md">
          <FaCamera size={14} />
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

      {/* Show buttons only if a new file is selected */}
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

export default AvatarUpload;
