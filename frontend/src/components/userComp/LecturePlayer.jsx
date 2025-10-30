import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Check, CheckCircle2 } from "lucide-react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import axiosConfig from "../../api/axiosConfig";

const LecturePlayer = ({ lecture, vedioCompleted, courseId }) => {
  const [duration, setDuration] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  console.log(lecture);


  useEffect(() => {
    setCompleted(false);
    setDuration(0);
  }, [lecture]);

  const handleEnded = () => {
    setCompleted(true);
    vedioCompleted(true);
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleCompleteLecture = async () => {
    if (!completed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axiosConfig.put(`/api/users/lecture-complete/${courseId}`,
        {
          lectureId: lecture._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
      if (res.status === 200) {
        toast.success(`Lecture "${lecture.title}" marked as completed!`);
      }
    } catch (error) {
      console.error("Error marking lecture as completed:", error);
    }
  }

  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-bold mb-2">{lecture.title}</h2>

      {
        lecture.videoUrl ? (
          <>
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <ReactPlayer
                src={lecture.videoUrl}
                width="100%"
                height="100%"
                controls={false}
                onDurationChange={(d) => setDuration(d.target.duration)}
                onEnded={handleEnded}
                onStart={handleStart}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Duration: {duration ? Math.floor(duration / 60) + " min" : "Loading..."}
              </p>

              {completed ? (
                <button
                  disabled
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-default"
                >
                  <CheckCircle2 className="w-5 h-5" /> Completed
                </button>
              ) : started ? (
                <button
                  className={`px-4 py-2 rounded-lg text-white transition ${started
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
                  disabled={!started}
                >
                  In Progress
                </button>
              ) : (
                <button
                  className={`px-4 py-2 rounded-lg text-white transition ${completed
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
                  disabled={!completed}
                >
                  Paused
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
            Video not available
          </div>
        )
      }
      <div className="my-4 w-full flex items-center justify-center">
        {
          lecture.isDone ? (
            <button
              className="px-7 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Completed
              </span>
            </button>
          ) : (
            <button
              className={`px-7 py-3 rounded ${completed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 cursor-not-allowed text-gray-400"} transition-colors`}
              disabled={!completed}
              onClick={handleCompleteLecture}
            >
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Mark as Completed
              </span>
            </button>
          )
        }
      </div>
    </div>
  );
};

export default LecturePlayer;
