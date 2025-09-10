import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axiosConfig from "../api/axiosConfig";

const ImagePickerModal = ({ isOpen, onClose, onSelect }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch free images (Unsplash API demo, no API key required for "source.unsplash.com")
  const fetchImages = async () => {
    setLoading(true);
    try {
      const encodedTerm = encodeURIComponent(searchTerm.toLowerCase());
      const response = await axiosConfig.get(
        `/api/images/thumbnails?q=${encodedTerm}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = response.data;
      setImages(data);
    } catch (err) {
      console.error("Error fetching images", err);
    } finally {
      setLoading(false);
    }
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold">Choose a Thumbnail</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchImages();
                }}
                className="mb-4 flex"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading images...</p>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="thumbnail option"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                    onClick={() => {
                      onSelect(url);
                      onClose();
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePickerModal;
