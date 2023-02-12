import { IPhoto } from "./IPhoto";

export interface IInfinitePage {
  nextPage: number | undefined;
  data: IPhoto[];
  hasMore: boolean;
}
