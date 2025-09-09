const AccessDeniedCard = ({
  message = "You don’t have permission to view this page.",
  onBack,
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onBack || (() => window.history.back())}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccessDeniedCard;
