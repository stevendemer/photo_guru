import { atom, useAtom } from "jotai";
import { IPhoto } from "../shared/IPhoto";
import { ITopic } from "../shared/ITopic";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = { ...createJSONStorage(() => sessionStorage) };

export const queryAtom = atomWithStorage<string[]>("query", []);

export const postsAtom = atom<IPhoto[]>([]);

export const themeAtom = atomWithStorage<string>("theme", "light");

export const topicsAtom = atom<string | undefined>(undefined);
