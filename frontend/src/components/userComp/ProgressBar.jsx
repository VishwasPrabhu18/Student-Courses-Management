const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
      <div
        className="bg-blue-600 h-3 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;