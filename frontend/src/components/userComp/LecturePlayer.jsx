import { useState, useEffect } from "react";
import { Play, Pause, History } from "lucide-react";

const LecturePlayer = ({ lecture }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(0);
    setIsPlaying(false);
  }, [lecture]);

  let duration = 60;
  if (lecture.duration.includes("hr")) {
    duration = parseInt(lecture.duration) * 3600;
  } else if (lecture.duration.includes("m")) {
    duration = parseInt(lecture.duration) * 60;
  } else {
    duration = parseInt(lecture.duration) || 60;
  }

  useEffect(() => {
    let timer;
    if (isPlaying && time < duration) {
      timer = setInterval(() => {
        setTime((prev) => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, time, duration]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const forward = () => setTime((t) => Math.min(t + 10, duration));
  const backward = () => setTime((t) => Math.max(t - 10, 0));

  const progress = (time / duration) * 100;

  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-bold">{lecture.title}</h2>
      <p className="text-gray-600 mb-4">Duration: {lecture.duration}</p>

      {/* Video Placeholder */}
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4 relative overflow-hidden">
        {isPlaying && (
          <div className="absolute w-32 h-32 bg-blue-400/30 rounded-full animate-ping" />
        )}

        <div
          className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md cursor-pointer hover:scale-105 transition"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-blue-600" />
          ) : (
            <Play className="w-10 h-10 text-blue-600" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button
          onClick={backward}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          <History className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={togglePlay}
          className="p-3 rounded bg-blue-600 text-white flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={forward}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          <History className="w-5 h-5 text-gray-700 transform -scale-x-100" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-300 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LecturePlayer;
