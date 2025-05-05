import { FiSearch, FiBell } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import { BiVideoPlus } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky w-full top-0 z-50 flex items-center justify-between px-4 py-2 bg-[#0f0f0f]">
      <Link href="/">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.webp"
              alt="Logo"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline">
            YouTube
          </span>
        </div>
      </Link>

      <div className="flex-1 flex justify-center">
        <div className="hidden sm:flex w-full max-w-[600px] items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 pl-4 pr-10 bg-[#121212] border border-[#303030] rounded-l-full text-sm focus:outline-none focus:border-[#1c62b9] h-10"
          />
          <button className="bg-[#222222] px-5 border border-l-0 border-[#303030] rounded-r-full hover:bg-[#272727] h-10 flex items-center justify-center">
            <FiSearch size={20} className="text-white" />
          </button>
          <button className="ml-2 p-2 bg-[#181818] hover:bg-[#272727] rounded-full h-10 w-10 flex items-center justify-center">
            <IoMicOutline size={20} className="text-white" />
          </button>
        </div>

        <div className="flex sm:hidden items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#272727]">
            <FiSearch size={20} className="text-white" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#272727]">
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
