import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const queryAtom = atomWithStorage<string[] | undefined>(
  "query",
  undefined
);

queryAtom.debugLabel = "query_atom";
