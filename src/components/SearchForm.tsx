"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchForm = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.length) return;
    setSearchQuery("");
    router.push(`/search/${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className='flex border border-black rounded p-1'>
        <input
          type='text'
          name='searchQuery'
          id='searchQuery'
          autoComplete='off'
          aria-label='블로그 검색'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='outline-none '
        />
        <button className='p-1' type='submit'>
          <IoSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
