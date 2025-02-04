import { ScrollArea } from "@/components/ui/scroll-area";
import { LeadershipPlacement } from "@/lib/types";
import TableItem from "../TableItem";

const PlacementTable = ({ data }: { data: LeadershipPlacement[] }) => {
  return (
    <div className="w-full bg-white rounded-lg border-2 border-solid border-border shadow-lg px-4 py-10 overflow-hidden">
      <ScrollArea className="w-full h-leaderboard">
        {data.length > 0 &&
          data.map((item) => <TableItem key={item.placement} {...item} />)}
      </ScrollArea>
    </div>
  );
};
export default PlacementTable;
