import Header from "@/components/molecule/Header";
import MainSidebar from "@/components/molecule/Sidebar/Main";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 h-full flex-1">
      <main className="col-span-3 pl-10 pr-6 flex flex-col pb-10">
        <Header />
        {children}
      </main>
      <aside className="col-span-1 bg-background-secondary h-screen sticky top-0 p-6">
        <MainSidebar />
      </aside>
    </div>
  );
}
