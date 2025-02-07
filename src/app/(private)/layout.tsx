import { getModules } from "@/actions/project.actions";
import Header from "@/components/molecule/Header";
import MainSidebar from "@/components/molecule/Sidebar/Main";

export default async function PrivateViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modules = await getModules();
  return (
    <div className="grid grid-cols-4 flex-1 min-h-0 h-screen">
      <div className="col-span-3 ~pl-7/10 ~pr-4/6 flex flex-col pb-6 h-full overflow-hidden">
        <Header />
        <main className="h-full overflow-hidden w-full">{children}</main>
      </div>
      <aside className="col-span-1 bg-background-secondary h-full overflow-hidden sticky top-0 py-6 ~px-4/6">
        <MainSidebar modulesData={modules.data} />
      </aside>
    </div>
  );
}
