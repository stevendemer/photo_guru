import { useState, useEffect, useCallback } from "react";
import { ITopic } from "../shared/ITopic";

const Carousel = ({ topics }: { topics: ITopic[] }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const handleOnNext = () => {};

  const handleOnPrev = () => {};

  return (
    <div className="w-full flex bg-slate-200 dark:bg-slate-400 whitespace-nowrap items-center flex-nowrap justify-center py-4  backdrop-blur-lg drop-shadow-lg bg-opacity-40 rounded-lg">
      {topics.map((topic) => (
        <div key={topic.id} className="flex justify-center items-center ">
          <div className="sm:text-sm text-xs text-slate-50 mx-2 cursor-pointer hover:bg-black/50 rounded-full p-2 duration-300">
            {topic.title.trim()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
