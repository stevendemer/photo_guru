import { atom, useAtom } from "jotai";

export const topicAtom = atom<string | undefined>(undefined);

topicAtom.debugLabel = "topic_atom";
