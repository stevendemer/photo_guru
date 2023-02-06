import { atom, useAtom } from "jotai";
import { IPhoto } from "../shared/IPhoto";
import { ITopic } from "../shared/ITopic";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = { ...createJSONStorage(() => sessionStorage) };

export const queryAtom = atomWithStorage<string[]>("query", []);

queryAtom.debugLabel = "queryAtom";

export const postsAtom = atom<IPhoto[]>([]);

postsAtom.debugLabel = "postsAtom";

export const themeAtom = atomWithStorage<string>("theme", "light");

themeAtom.debugLabel = "themeAtom";

export const topicAtom = atom<string | undefined>(undefined);

topicAtom.debugLabel = "topicAtom";
