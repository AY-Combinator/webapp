import { getUserProject } from "@/actions/project.actions";
import DataRoom from "@/components/molecule/DataRoom";
import Overview from "@/components/molecule/Project/Overview";

const DashboardRoute = async () => {
  const project = await getUserProject();

  return (
    <div className="flex flex-col gap-6 overflow-hidden h-full">
      {project.project && <Overview {...project.project} />}
      <DataRoom />
    </div>
  );
};
export default DashboardRoute;
