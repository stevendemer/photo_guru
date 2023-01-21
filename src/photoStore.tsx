import { IPhoto } from "shared/IPhoto";
import { create } from "zustand";

interface StoreState {
  photos: IPhoto[];
  addPhotos: (posts: IPhoto[]) => void;
  reset: () => void;
}

export const useStore = create<StoreState>()((set) => ({
  photos: [],
  addPhotos: (posts) =>
    set((state) => ({
      photos: state.photos.concat(posts),
    })),
  reset: () =>
    set((state) => ({
      photos: [],
    })),
}));
