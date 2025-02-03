export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full min-h-screen">
      <div className="flex flex-col justify-between w-full h-auto ~px-6/10 bg-sand-orange-gradient">
        <main className="flex-1 w-full h-full flex justify-center items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
