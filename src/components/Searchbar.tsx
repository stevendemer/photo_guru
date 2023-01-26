import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useAtom, useSetAtom } from "jotai";
import { queryAtom, postsAtom } from "../atoms/postsAtom";
import useSearchPost from "../hooks/useSearchPost";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useIsFetching } from "react-query";

type IProps = {
  setSearchTerm: () => void;
};

type Inputs = {
  searchTerm: string;
};

const Searchbar = () => {
  const [value, setValue] = useState<string>("");
  const setPosts = useSetAtom(postsAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const { status, refetch, fetchNextPage, hasNextPage } = useSearchPost();

  const navigate = useNavigate();

  useEffect(() => {
    if (query === "" || query === " ") {
      navigate("/");
    }
  }, [query]);

  const onSubmit = (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    setQuery(value);
    navigate("/s/photos");
    setValue("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={onSubmit} className="text-black my-10 w-full">
      <span className="md:flex flex-row bg-slate-50 py-2 items-center justify-around mx-auto rounded-md  border-slate-300-2 w-full ">
        <input
          type="text"
          placeholder="Search for a photo"
          className="rounded-lg bg-transparent text-black font-thin outline-none ring-0  focus:outline-none px-4 py-[10px] w-full"
          value={value}
          onChange={onChange}
        />
        <button className="opacity-60 text-black font-extrabold px-2 py-1 outline-none hover:outline-2 hover:opacity-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </form>
  );
};

export default Searchbar;
