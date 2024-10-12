"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      <input
        type='text'
        name='searchQuery'
        id='searchQuery'
        autoComplete='off'
        aria-label='블로그 검색'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>검색</button>
    </form>
  );
};

export default SearchForm;
