import { atom } from "jotai";
import { IPhoto } from "../shared/IPhoto";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

// const storage = { ...createJSONStorage(() => sessionStorage) };

export const postsAtom = atom<IPhoto[]>([]);

postsAtom.debugLabel = "posts_atom";
