"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <div>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        type="search"
      />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
}
