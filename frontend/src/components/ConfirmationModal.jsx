import { motion, AnimatePresence } from "framer-motion";

const ConfirmationModal = ({
  isOpen,
  icon,
  title,
  description,
  onOk,
  onCancel,
  iconBg,
  cardBg,
  btnBg,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={` rounded-2xl shadow-xl w-full max-w-md p-6 relative ${cardBg}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Icon + Title */}
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center`}
              >
                {icon}
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onOk}
                className={`${btnBg} px-4 py-2 rounded-lg text-sm`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
