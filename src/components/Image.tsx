const Image = ({
  url,
  alt,
  author,
}: {
  url?: string;
  alt?: string;
  author?: string;
}) => {
  return (
    <div className="py-4 space-x-2 cursor-pointer relative hover:drop-shadow-2xl shadow-slate-50 transition-all duration-300 delay-75 hover:scale-105 hover:translate-2 overflow-hidden ">
      <img className="rounded-lg " src={url} alt={alt} />
      <div className=" absolute min-w-full bg-slate-50">
        <div className="text-slate-50 sm:text-md font-normal absolute bottom-5 left-5 whitespace-nowrap">
          {author}
        </div>
      </div>
    </div>
  );
};

export default Image;
