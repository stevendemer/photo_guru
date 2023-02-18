import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox, Transition } from "@headlessui/react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAtom, useSetAtom } from "jotai";
import { postsAtom } from "atoms/postsAtom";
import { queryAtom } from "atoms/queryAtom";
import useSearchPost from "../hooks/useSearchPost";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { z } from "zod";

type IProps = {
  setSearchTerm: () => void;
};

const schema = z
  .string()
  .min(3, { message: "Query must be at least 3 characters long" });

type Input = z.infer<typeof schema>;

const Searchbar = () => {
  const setPosts = useSetAtom(postsAtom);
  const [value, setValue] = useState<string>("");
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

  const filteredQueries =
    value === ""
      ? queries
      : queries.filter((query) => {
          return query.toLowerCase().trim().includes(value.toLowerCase());
        });

  return (
    <form
      onSubmit={onSubmit}
      className="text-black my-4 justify-center items-center lg:flex w-full absolute hidden"
    >
      <span className="flex bg-white  py-2 justify-around rounded-lg sm:w-1/2 ">
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
