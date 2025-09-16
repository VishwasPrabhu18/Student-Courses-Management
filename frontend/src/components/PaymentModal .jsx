import { useState } from "react";
import { FiX, FiCreditCard, FiCheckCircle, FiLoader } from "react-icons/fi";

const PaymentModal = ({ isOpen, onClose, course }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [step, setStep] = useState("form"); // form | processing | success
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // Simple validation
  const validateForm = () => {
    if (cardNumber.replace(/\s+/g, "").length !== 16) {
      return "Card number must be 16 digits";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      return "Expiry must be in MM/YY format";
    }
    if (cvv.length !== 3) {
      return "CVV must be 3 digits";
    }
    return "";
  };

  const handlePayNow = () => {
    const err = validateForm();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep("processing");
    setTimeout(() => setStep("success"), 2000); // simulate 2s payment delay
  };

  const resetAndClose = () => {
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setStep("form");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        {step === "form" && (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <FiCreditCard className="text-blue-600" size={24} />
              <h2 className="text-lg font-semibold text-gray-800">
                Payment Details
              </h2>
            </div>

            {/* Course Info */}
            {course && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-700">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
                <p className="mt-2 font-semibold text-green-600 text-lg">
                  ₹
                  {course.offeredPrice > 0
                    ? course.offeredPrice
                    : course.originalPrice}
                </p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={19}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={5}
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm text-gray-600 mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="***"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={3}
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-10">
            <FiLoader className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-gray-700 font-medium">Processing Payment...</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-10">
            <FiCheckCircle className="text-green-600 mb-4" size={40} />
            <p className="text-gray-700 font-medium">Payment Successful 🎉</p>
            <button
              onClick={resetAndClose}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
