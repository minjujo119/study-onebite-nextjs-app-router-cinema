import Searchbar from "./searchbar";

export default function SearchbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
