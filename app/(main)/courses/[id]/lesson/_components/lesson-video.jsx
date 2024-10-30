"use client";
import ReactPlayer from "react-player/youtube";
import { useEffect, useState } from "react";

const LessonVideo = ({ courseId, lesson, module }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);


  useEffect(() => {
    
  }, [started]);

  useEffect(() => {
    
  }, [ended]);

  const handleOnStart = () => {
    setStarted(true);
  };

  const handleOnEnded = () => {
    setEnded(true);
  };

  const handleOnDuration = (duration) => {
    setDuration(duration);
  };

  return (
    <>
      {hasWindow && (
        <ReactPlayer
          url={lesson?.video_url}
          width={"100%"}
          height={"470px"}
          controls={true}
          onStart={handleOnStart}
          onEnded={handleOnEnded}
          onDuration={handleOnDuration}
        />
      )}
    </>
  );
};

export default LessonVideo;
