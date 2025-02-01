import ModuleList from "../../ModuleList";

const MainSidebar = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg text-background leading-none font-archivo-black">
          Modules
        </h2>
        <span className="font-archivo text-lg text-background/30">4 / 8</span>
      </div>
      <ModuleList />
    </div>
  );
};
export default MainSidebar;
