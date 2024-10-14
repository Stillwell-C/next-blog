"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

type Props = {
  closeNavBar?: () => void;
};

const SearchForm = ({ closeNavBar }: Props) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.length) return;
    setSearchQuery("");
    setShowSearch(false);
    if (closeNavBar) closeNavBar();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <div className='relative'>
      {/* DESKTOP */}
      <button
        className='hidden md:flex'
        onClick={() => setShowSearch((prev) => !prev)}
      >
        <IoSearch size={20} />
      </button>
      {showSearch && (
        <form
          className='md:absolute md:top-10 md:-translate-x-60'
          onSubmit={handleSearch}
        >
          <div className='flex border border-black dark:border-white rounded p-1'>
            <button
              className='p-1'
              type='button'
              onClick={() => setShowSearch(false)}
            >
              <IoClose />
            </button>
            <input
              type='text'
              name='searchQuery'
              id='searchQuery'
              autoComplete='off'
              aria-label='블로그 검색'
              placeholder='블로그 검색'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='outline-none text-lg'
            />
            <button className='p-1' type='submit'>
              <IoSearch />
            </button>
          </div>
        </form>
      )}
      {/* MOBILE */}
      <form className='block md:hidden ' onSubmit={handleSearch}>
        <div className='flex p-2'>
          <input
            type='text'
            name='searchQuery'
            id='searchQuery'
            autoComplete='off'
            aria-label='블로그 검색'
            placeholder='블로그 검색'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='outline-none border-b border-black dark:border-white w-36 text-lg px-2 py-1'
          />
          <button className='p-1' type='submit'>
            <IoSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
