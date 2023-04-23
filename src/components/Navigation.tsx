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
  const [topic, setTopic] = useAtom(topicAtom);
  const [currentTopic, setCurrentTopic] = useState<string | undefined>(
    undefined
  );
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [selected, setSelected] = useState(false);

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
    setTopic(topic.slug);
    setTitle(topic.title);
    setSubtitle(topic.description);
    navigate(`/t/${topic.slug}`);
    setSelected(true);
    // console.log("Current topic is ", topic);
  };

  return (
    <div className="w-full sm:flex-col flex items-center py-4 ring-0">
      <div className="drop-shadow-xl backdrop-blur-3xl rounded-full p-2 bg-slate-100 dark:bg-slate-200">
        <Tab.Group
          selectedIndex={currentIdx}
          onChange={setCurrentIdx}
          vertical
          defaultIndex={-1}
        >
          <Tab.List className="w-full flex flex-nowrap whitespace-nowrap items-center justify-center">
            {topics?.map((topic, idx) => (
              <Tab key={topic.id} className="border-none ring-0 outline-none">
                <div
                  onClick={() => handleClick(topic)}
                  className={`flex justify-center items-center ${
                    selected && "text-white"
                  }`}
                >
                  <div
                    className={`sm:text-sm border-none text-slate-400 dark:text-gray-600  delay-100 ring-0 inset-0 text-xs underline-offset-8 decoration-2  mx-2 cursor-pointer transition-all rounded-full p-2 duration-100 link link-underline ${
                      selected && "text-slate-700"
                    } }`}
                  >
                    {topic.title.trim()}
                  </div>
                </div>
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Navigation;
