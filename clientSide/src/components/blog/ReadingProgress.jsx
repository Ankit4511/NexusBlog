import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const percentage = (scrollTop / documentHeight) * 100;

      setProgress(Math.min(100, percentage));
    };

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[9999] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 transition-all duration-150"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};

export default ReadingProgress;