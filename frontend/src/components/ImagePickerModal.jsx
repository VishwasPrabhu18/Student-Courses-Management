import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ImagePickerModal = ({ isOpen, onClose, onSelect }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch free images (Unsplash API demo, no API key required for "source.unsplash.com")
  useEffect(() => {
    if (!isOpen) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const urls = Array.from({ length: 15 }, (_, i) =>
          `https://source.unsplash.com/random/400x200?sig=${i}&education`
        );
        setImages(urls);
      } catch (err) {
        console.error("Error fetching images", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
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
