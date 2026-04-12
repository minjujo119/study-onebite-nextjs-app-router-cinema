import { MovieData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
  );
  if (!response.ok) {
    console.log("데이터 fetch 실패");
  }
  const movieData = await response.json();
  const IdArray: { id: string }[] = movieData.map((movie: MovieData) => ({
    id: String(movie.id),
  }));

  return IdArray; //[{ id: "1" }, { id: "2" }, { id: "3" }, ....]
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const movieData: MovieData = await response.json();

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movieData;

  return (
    <>
      <div
        className={style.image_box}
        style={{ backgroundImage: `url(${posterImgUrl})` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={style.text_box}>
        <h1>{title}</h1>
        <p>{`${releaseDate}/${genres}/${runtime}분`}</p>
        <p>{company}</p>
        <h2>{subTitle}</h2>
        <p>{description}</p>
      </div>
    </>
  );
}
