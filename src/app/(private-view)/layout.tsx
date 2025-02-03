import Header from "@/components/molecule/Header";

export default function PrivateViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full min-h-screen">
      <div className="flex flex-col justify-between w-full h-auto ~px-6/10">
        <Header />
        <main className="flex-1 w-full h-full">{children}</main>
      </div>
    </div>
  );
}
