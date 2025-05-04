import { FaYoutube } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import { BiVideoPlus } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <FaYoutube size={28} className="text-red-600" />
        <span className="font-bold text-xl tracking-tight hidden sm:inline">
          YouTube
        </span>
      </div>

      <div className="hidden sm:flex flex-1 justify-center items-center max-w-2xl">
        <div className="flex w-full max-w-[600px]">
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pl-4 pr-10 border border-[#303030] rounded-l-full text-sm focus:outline-none focus:border-[#1c62b9] h-10"
            />
          </div>
          <button className="bg-[#222222] px-5 border border-l-0 border-[#303030] rounded-r-full hover:bg-[#272727] h-10 flex items-center justify-center">
            <FiSearch size={20} className="text-white" />
          </button>
          <button className="ml-2 p-2 bg-[#181818] hover:bg-[#272727] rounded-full h-10 w-10 flex items-center justify-center">
            <IoMicOutline size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-[#272727] hidden sm:block">
          <BiVideoPlus size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-[#272727] hidden sm:block">
          <FiBell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm ml-2">
          A
        </div>
      </div>
    </header>
  );
}
