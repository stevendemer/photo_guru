import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const queryAtom = atomWithStorage<string[]>("queries", []);

queryAtom.debugLabel = "query_atom";
