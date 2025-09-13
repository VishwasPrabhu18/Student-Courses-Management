const CustomInput = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error,
  minNumRows = 1,
}) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-gray-700">{label}</label>}
      {type === "textarea" ? (
        <textarea
          rows={minNumRows}
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomInput;
