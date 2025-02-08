"use client";
import { usePathname, useRouter } from "next/navigation";
import ModuleList from "../../ModuleList";
import { Button } from "@/components/ui/button";
import { ArrowElbowDownLeft } from "@phosphor-icons/react/dist/ssr";
import { ModulesResponseData } from "@/actions/module.actions";

const MainSidebar = ({
  modulesData,
}: {
  modulesData: ModulesResponseData | null;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  if (!modulesData) return;
  return (
    <div className="flex h-full flex-col gap-5 justify-between relative">
      <div className="flex flex-col gap-5 h-full overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg text-background leading-none font-archivo-black">
            Modules
          </h2>
          <span className="font-archivo text-lg text-background/30">
            {modulesData.completedModules} / {modulesData.totalModules}
          </span>
        </div>
        {modulesData.modulesByChapters && (
          <ModuleList chapterData={modulesData.modulesByChapters} />
        )}
      </div>
      {pathname !== "/dashboard" && (
        <Button
          onClick={() => router.push("/dashboard")}
          className="rounded-sm bg-accent-foreground text-background py-5 h-max hover:bg-orange/30 font-archivo font-medium"
        >
          <ArrowElbowDownLeft size={18} /> <span>Go Back to Dashboard</span>
        </Button>
      )}
    </div>
  );
};
export default MainSidebar;
