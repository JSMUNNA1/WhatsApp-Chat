import { useEffect, useState } from "react";
import { stories } from "./DummyStory";
import "./Progress.css";
import ProgressBar from "./Progress";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const StatusViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextStory();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <div className="realtive flex  justify-center items-center h-[100vh] bg-slate-900">
          <div className="relative ">
            <img
              className="  max-h-[96vh] object-contain"
              src={stories?.[currentStoryIndex].image}
              alt=""
            />
            <div className=" absolute top-0 flex w-full">
              {stories.map((key, index) => (
                <ProgressBar
                  key={key}
                  duration={2000}
                  index={index}
                  activeIndex={activeIndex}
                ></ProgressBar>
              ))}
            </div>
          </div>
          <div>
            <BsArrowLeft
              className="text-white text-3xl cursor-pointer 
              absolute top-5 left-10"
              onClick={handleNavigate}
            ></BsArrowLeft>
            <AiOutlineClose
              onClick={handleNavigate}
              className=" absolute top-5 text-white text-3xl cursor-pointer right-10"
            ></AiOutlineClose>
          </div>
        </div>
      </div>
    </>
  );
};
export default StatusViewer;
