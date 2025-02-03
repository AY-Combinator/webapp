import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatHistory = () => {
  return (
    <div className="flex flex-col py-4 px-3 gap-4 flex-1 w-full">
      <h2 className="font-medium pl-3">Chat History</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="today" className="border-none">
          <AccordionTrigger className="p-3 font-bold">Today</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="w-full h-48">
              <Button
                variant={"ghost"}
                className="w-full justify-start font-normal text-sm hover:bg-background"
              >
                File Upload
              </Button>
              <Button
                variant={"ghost"}
                className="w-full justify-start font-normal text-sm hover:bg-background"
              >
                Key Activities
              </Button>
              <Button
                variant={"ghost"}
                className="w-full justify-start font-normal text-sm hover:bg-background"
              >
                Customer Segment
              </Button>
              <Button
                variant={"ghost"}
                className="w-full justify-start font-normal text-sm hover:bg-background"
              >
                Key Resources
              </Button>
              <Button
                variant={"ghost"}
                className="w-full justify-start font-normal text-sm hover:bg-background"
              >
                Channels
              </Button>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="yesterday" className="border-none">
          <AccordionTrigger className="px-3 font-bold">
            Yesterday
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="last-week" className="border-none">
          <AccordionTrigger className="px-3 font-bold">
            Previous 7 Days
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default ChatHistory;
