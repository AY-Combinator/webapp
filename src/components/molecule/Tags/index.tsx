import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-2 items-center">
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <Badge
            className="rounded-full bg-background px-2 py-1 leading-none font-source-serif font-semibold italic text-sm text-background-secondary/80 hover:bg-background"
            key={index}
          >
            {tag}
          </Badge>
        ))}
      <Dialog>
        <DialogTrigger asChild>
          <Badge className="rounded-full bg-background px-2 py-1 leading-none font-source-serif font-semibold text-sm text-background-secondary/80 hover:bg-background-secondary cursor-pointer hover:text-white">
            +
          </Badge>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-archivo-black text-lg">
              Add Tags
            </DialogTitle>
            <DialogDescription className="font-archivo text-base text-black">
              Add tags to your project. Separate multiple tags with a comma.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 items-center mt-2">
            <Input placeholder="Add tags" className="bg-orange/5 placeholder:text-black/60" />
            <Button className="bg-orange">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Tags;
