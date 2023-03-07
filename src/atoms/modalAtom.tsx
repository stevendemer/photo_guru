import { atom } from "jotai";

export const modalAtom = atom<boolean>(false);

modalAtom.debugLabel = "modal_atom";
