import { useState, useEffect, useCallback } from "react";
import { ITopic } from "../shared/ITopic";

const Carousel = ({ topics }: { topics: ITopic[] }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleOnNext = () => {};

  const handleOnPrev = () => {};

  return (
    <div className="w-full flex bg-slate-200 dark:bg-slate-400 whitespace-nowrap items-center flex-nowrap justify-center py-4  backdrop-blur-lg drop-shadow-lg bg-opacity-40 rounded-lg">
      {topics.map((topic) => (
        <div
          onClick={handleClick}
          key={topic.id}
          className={`flex justify-center items-center`}
        >
          <div
            className={`sm:text-sm text-xs decoration-slate-200 underline-offset-8 decoration-2  text-gray-50 mx-2 cursor-pointer rounded-full p-2 duration-300 link link-underline           `}
          >
            {topic.title.trim()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
