import DataRoom from "@/components/molecule/DataRoom";
import Overview from "@/components/molecule/Overview";

const DashboardRoute = () => {
  return (
    <div className="flex flex-col gap-6 overflow-hidden h-full">
      <Overview />
      <DataRoom />
    </div>
  );
};
export default DashboardRoute;
