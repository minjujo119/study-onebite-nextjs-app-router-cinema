function MovieItemSkeleton() {
  return (
    <div
      style={{ backgroundColor: "#333333", width: "148px", height: "210px" }}
    ></div>
  );
}

export default function MovieListSkeleton({ count }: { count: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "5px",
      }}
    >
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton key={idx} />
      ))}
    </div>
  );
}
