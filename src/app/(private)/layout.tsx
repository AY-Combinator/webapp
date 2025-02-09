import { getModules } from "@/actions/module.actions";
import { getUserProject, isProjectBasicFilled } from "@/actions/project.actions";
import Header from "@/components/molecule/Header";
import MainSidebar from "@/components/molecule/Sidebar/Main";
import { Lock } from "@phosphor-icons/react/dist/ssr";
import { POINTS_TO_UNLOCK_FUNDING } from "../../../constants";

export default async function PrivateViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modules = await getModules();
  const clickable = await isProjectBasicFilled();
  const project = await getUserProject();

  return (
    <div className="grid grid-cols-4 flex-1 min-h-0 h-screen">
      <div className="col-span-3 ~pl-7/10 ~pr-4/6 flex flex-col pb-6 h-full overflow-hidden">
        <Header
          enableFundingButton={(project?.project?.cumulativeProgress?.earnedPoints ?? 0) >= POINTS_TO_UNLOCK_FUNDING}
        />
        <main className="h-full overflow-hidden w-full">{children}</main>
      </div>
      <aside className="col-span-1 bg-background-secondary h-full overflow-hidden sticky top-0 py-6 ~px-4/6">
        {!clickable && (
          <div className="absolute backdrop-blur-[2px] bg-sky/10 z-50 inset-0 flex flex-col justify-end p-4 items-center">
            <div className="w-full font-archivo bg-orange px-2 py-1 text-white rounded-lg font-medium text-center flex justify-center items-center gap-2 text-sm">
              <Lock />
              <span>Add project details to unlock</span>
            </div>
          </div>
        )}

        <MainSidebar modulesData={modules.data} />
      </aside>
    </div>
  );
}
