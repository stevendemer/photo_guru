import { Tab } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { ITopic } from "../shared/ITopic";
import { useAtom } from "jotai";
import { topicsAtom } from "atoms/postsAtom";
import useFetchCategoryPhotos from "../hooks/useFetchCategories";
import { useNavigate } from "react-router-dom";

const Carousel = ({ topics }: { topics?: ITopic[] }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [topic, setTopic] = useAtom(topicsAtom);
  const [currentTopic, setCurrentTopic] = useState<string | undefined>(
    undefined
  );
  useFetchCategoryPhotos();
  const navigate = useNavigate();

  const handleClick = (topic: ITopic) => {
    setActive(!active);
    setTopic(topic.slug);
    navigate(`/t/${topic.slug}`);
    console.log("Current topic is ", topic);
    // console.log(topic.slug);
    // console.log(topic);
  };

  const handleOnNext = () => {};

  const handleOnPrev = () => {};

  return (
    <div className="container md:w-full flex bg-slate-200 dark:bg-slate-400 whitespace-nowrap items-center flex-nowrap justify-center py-4  backdrop-blur-lg drop-shadow-lg bg-opacity-40 rounded-lg border-none ring-0 ">
      <Tab.Group
        selectedIndex={currentIdx}
        onChange={setCurrentIdx}
        vertical
        defaultIndex={1}
      >
        <Tab.List>
          {topics?.map((topic) => (
            <Tab key={topic.id} className="border-none ring-0 outline-none">
              {({ selected }) => (
                <div
                  onClick={(e) => handleClick(topic)}
                  key={topic.id}
                  className={`flex justify-center items-center`}
                >
                  <div
                    className={`sm:text-sm border-none ring-0 inset-0 text-xs decoration-slate-200 underline-offset-8 decoration-2  text-gray-50  mx-2 cursor-pointer rounded-full p-2 duration-300 link link-underline ${
                      selected ? "bg-slate-200 text-gray-600 p-2" : null
                    }`}
                  >
                    {topic.title.trim()}
                  </div>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default Carousel;
