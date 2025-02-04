import PlacementTable from "@/components/molecule/Leaderboard/PlacementTable";
import PodiumBox from "@/components/molecule/Leaderboard/PodiumBox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { leadershipPlacementData } from "@/data/mock/leadership";

const Leaderboard = () => {
  const orderedPlacements = [
    leadershipPlacementData[1],
    leadershipPlacementData[0],
    leadershipPlacementData[2],
  ];
  const remainingPlacements = leadershipPlacementData.slice(3);
  return (
    <Tabs
      defaultValue="today"
      className="w-full h-full flex flex-col justify-between"
    >
      <TabsList className="grid grid-cols-3 w-max">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="this-week">This Week</TabsTrigger>
        <TabsTrigger value="all-time">All Time</TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="flex-1">
        <div className="w-full h-full mx-auto max-w-leadership-container flex flex-col pt-4 justify-end">
          <div className="grid grid-cols-3 mx-auto w-full max-w-podium-container">
            {orderedPlacements.length > 0 &&
              orderedPlacements.map((leader) => (
                <PodiumBox key={leader.placement} {...leader} />
              ))}
          </div>
          <PlacementTable data={remainingPlacements} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default Leaderboard;
