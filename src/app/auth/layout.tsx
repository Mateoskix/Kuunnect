import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuunnect | Login",
  description: "Login to your Kuunnect account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {children}
    </main>
  );
}
