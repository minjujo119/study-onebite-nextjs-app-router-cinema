import MovieListSkeleton from "@/components/skeleteon/movie-list-skeleton";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { delay } from "@/utils/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  // 스켈레톤UI 확인을 위한 가짜 딜레이
  await delay(3000);

  // 서치 데이터 fetch
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const searchResult: MovieData[] = await response.json();

  return (
    <ul className={style.container}>
      {searchResult.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </ul>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q} fallback={<MovieListSkeleton count={3} />}>
      <SearchResult q={q} />
    </Suspense>
  );
}
