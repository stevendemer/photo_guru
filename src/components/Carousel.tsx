import { IPhoto } from "../shared/IPhoto";

type Props = {
  index: number;
  currentPhoto: IPhoto;
};

const Carousel = ({ index, currentPhoto }: Props) => {
  return <div>Carousel</div>;
};

export default Carousel;
