import { Tab } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { ITopic } from "../shared/ITopic";
import { useAtom } from "jotai";
import { topicAtom } from "atoms/topicAtom";
import useFetchCategoryPhotos from "../hooks/useFetchCategories";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchTopics } from "api/fetchPhotos";
import { titleAtom, subtitleAtom } from "../atoms/titleAtom";

const Navigation = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [topic, setTopic] = useAtom(topicAtom);
  const [currentTopic, setCurrentTopic] = useState<string | undefined>(
    undefined
  );
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);

  const navigate = useNavigate();

  const {
    data: topics,
    isLoading,
    isError,
    error,
  } = useQuery<ITopic[], Error>({
    queryKey: ["categories"],
    queryFn: async () => fetchTopics(),
  });

  const handleClick = (topic: ITopic) => {
    setActive(!active);
    setTopic(topic.slug);
    setTitle(topic.title);
    setSubtitle(topic.description);
    navigate(`/t/${topic.slug}`);
    // console.log("Current topic is ", topic);
  };

  return (
    <div className="w-full bg-clip-padding backdrop-filter backdrop-blur-2xl sm:flex-col bg-gradient-to-tr from-purple-800 via-violet-900 to-purple-800   flex items-center py-4 ring-0">
      <Tab.Group
        selectedIndex={currentIdx}
        onChange={setCurrentIdx}
        vertical
        defaultIndex={-1}
      >
        <Tab.List className="w-full flex flex-nowrap whitespace-nowrap items-center justify-center text-slate-50">
          {topics?.map((topic) => (
            <Tab key={topic.id} className="border-none ring-0 outline-none">
              {({ selected }) => (
                <div
                  onClick={(e) => handleClick(topic)}
                  key={topic.id}
                  className={`flex justify-center items-center`}
                >
                  <div
                    className={`sm:text-sm border-none text-opacity-80 delay-100 ring-0 inset-0 text-xs text-slate-100 underline-offset-8 decoration-2  mx-2 cursor-pointer transition-all rounded-full p-2 duration-100 link link-underline  ${
                      selected && "text-opacity-100"
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

export default Navigation;
