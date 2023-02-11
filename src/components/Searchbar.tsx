import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "../api/axios";
import { useAtom, useSetAtom } from "jotai";
import { postsAtom } from "atoms/postsAtom";
import { queryAtom } from "atoms/queryAtom";
import useSearchPost from "../hooks/useSearchPost";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const [queries, setQueries] = useAtom(queryAtom);
  const { status, refetch, fetchNextPage, hasNextPage } = useSearchPost();

  const navigate = useNavigate();

  useEffect(() => {
    if (queries !== undefined) {
      if (queries.length > 0) {
        navigate(`/s/photos/q=${queries[0]}`);
      } else {
        navigate("/");
      }
    }
  }, [queries]);

  const onSubmit = (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    if (value !== "") {
      // prepend the new input to the array of queries
      setQueries((prev) => [value, ...(prev as string[])]);
    } else {
      navigate("/");
    }
    setValue("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="text-black my-10  justify-center items-center flex w-full"
    >
      <span className="flex bg-white  py-2 justify-around rounded-lg sm:container ">
        <button className="opacity-60 text-black font-extrabold px-2 outline-none hover:outline-2 hover:opacity-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search for a photo"
          className="rounded-lg text-black bg-white font-regular outline-none ring-0 focus:outline-none px-4 py-[10px] w-full"
          value={value}
          onChange={onChange}
        />
      </span>
    </form>
  );
};

export default Searchbar;
