import { MovieData } from "@/types";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { delay } from "@/utils/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleteon/movie-list-skeleton";

async function AllMovies() {
  await delay(2500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const allMovies: MovieData[] = await response.json();

  return (
    <div className={style.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function RecoMovies() {
  await delay(2000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const recoMovies: MovieData[] = await response.json();

  return (
    <div className={style.all_container}>
      {recoMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <h3>지금 가장 추천하는 영화</h3>
      <Suspense fallback={<MovieListSkeleton count={3} />}>
        <RecoMovies />
      </Suspense>
      <h3>등록된 모든 영화</h3>
      <Suspense fallback={<MovieListSkeleton count={5} />}>
        <AllMovies />
      </Suspense>
    </div>
  );
}
