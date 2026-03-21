import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const searchResult: MovieData[] = await response.json();
  return (
    <div>
      <ul className={style.container}>
        {searchResult.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </ul>
    </div>
  );
}
