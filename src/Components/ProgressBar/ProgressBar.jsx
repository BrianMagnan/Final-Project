import { useState, useEffect } from "react";
import "./ProgressBar.css";

function ProgressBar({
  progress = 0,
  total = 100,
  showPercentage = true,
  className = "",
}) {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const targetProgress = (progress / total) * 100;
    const increment = targetProgress / 20; // 20 steps for smooth animation

    const timer = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(timer);
          return targetProgress;
        }
        return Math.min(prev + increment, targetProgress);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [progress, total]);

  const percentage = Math.round(currentProgress);

  return (
    <div className={`progress-bar ${className}`}>
      <div className="progress-bar__container">
        <div
          className="progress-bar__fill"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="progress-bar__text">{percentage}%</div>
      )}
    </div>
  );
}

export default ProgressBar;
