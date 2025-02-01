export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 h-full flex-1">
      <main className="col-span-3 pl-10 pr-6">{children}</main>
      <aside className="col-span-1 bg-background-secondary h-screen sticky top-0 p-6"></aside>
    </div>
  );
}
