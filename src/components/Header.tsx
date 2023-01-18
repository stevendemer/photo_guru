import { Link } from "react-router-dom";
const routes = [
  {
    title: "Browse",
    route: "/dashboard",
  },
  {
    title: "Profile",
    route: "/profile",
  },
];

const Header = () => {
  return (
    <div className="sm:w-full bg-indigo-700">
      <div className="container mx-auto py-4 flex items-center justify-center">
        <div className="sm:text-lg text-gray-100 ml-2 text-xs font-body whitespace-nowrap ">
          Photo Smash
        </div>
        <div className="flex md:hidden px-20 text-slate-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-slate-50 mx-auto cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>

        <div className="sm:flex items-center mx-auto sm:justify-center space-x-4 hidden">
          {routes.map((route, idx) => (
            <Link
              to={route.route}
              key={idx}
              className="rounded-lg py-2 px-4 text-gray-50 hover:bg-slate-200 hover:text-slate-800 space-x-2 transition-colors duration-300 lg:text-lg text-xs"
            >
              {route.title}
            </Link>
          ))}
        </div>
        <span className="md:flex flex-row bg-slate-50 items-center justify-around mx-auto rounded-md hidden ">
          <input
            type="text"
            placeholder="Search for a photo"
            className="rounded-lg focus:ring-2 ring-slate-50/30 focus:outline-none  px-2 py-1"
          />
          <button className="bg-transparent text-black px-2 py-1 outline-none focus:outline-2 focus:opacity-50 hover:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Header;
