import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CustomInput = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error,
  minNumRows = 1,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-gray-700">{label}</label>}

      {type === "textarea" ? (
        <textarea
          rows={minNumRows}
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? "border-red-500" : "border-gray-300"
            }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      ) : type === "password" ? (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full border rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? "border-red-500" : "border-gray-300"
              }`}
            disabled={disabled}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? "border-red-500" : "border-gray-300"
            }`}
          disabled={disabled}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomInput;
