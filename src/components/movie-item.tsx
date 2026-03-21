import { MovieData } from "@/types";
import Link from "next/link";

export default function MovieItem(movie: MovieData) {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_DEV_LINK}/movie/${movie.id}`}>
      <img src={movie.posterImgUrl} alt={movie.title} />
    </Link>
  );
}
