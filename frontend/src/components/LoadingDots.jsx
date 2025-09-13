const LoadingDots = () => {
  return (
    <div className="fixed inset-0 pl-70 pt-20 flex items-center justify-center bg-black/30 z-50 w-full h-full">
      <div className="bg-white px-14 rounded-xl shadow-lg flex items-center justify-center">
        <span className="flex space-x-2 py-7">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </span>
      </div>
    </div>
  );
};

export default LoadingDots;
