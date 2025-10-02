import Navbar from "@/components/shared/navbar/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <Navbar />
      {children}
    </main>
  );
}
