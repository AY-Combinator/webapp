"use client";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../Message";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowBendRightDown } from "@phosphor-icons/react/dist/ssr";

const MessagesStream = () => {
  // Reference to the scrollable viewport inside ScrollArea
  const viewportRef = useRef<HTMLDivElement>(null);

  // State to control the visibility of the "Go to Bottom" button
  const [showGoToBottom, setShowGoToBottom] = useState<boolean>(false);

  /**
   * Scrolls the chat to the bottom smoothly when invoked. To be used as click action on Go to Bottom button.
   */
  const scrollToBottom = () => {
    if (viewportRef !== null && viewportRef.current !== null) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  /**
   * Tracks the user's scroll position and determines whether the "Go to Bottom" button should be shown.
   */
  const handleScroll = () => {
    if (!viewportRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;

    // Show Go to Bottom only if the user scrolls more than 50px. Prevents showing the button on accidental scrolls.
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 50;

    // Update state only if necessary to prevent redundant re-renders
    if (isScrolledUp !== showGoToBottom) {
      setShowGoToBottom(isScrolledUp);
    }
  };

  /**
   * useEffect to:
   * - Scroll to the bottom when the component first mounts
   * - Attach a scroll event listener to track scrolling
   * - Clean up the event listener when the component unmounts
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    /**
     * Scroll to the bottom immediately on first render (no animation).
     * TODO: Check with the team if we want smooth scroll here as well.
     */
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "instant" });

    // Attach scroll event listener
    viewport.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup: Remove the event listener when component unmounts
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-white pointer-events-none z-50" />
      <ScrollArea className="w-full" viewportRef={viewportRef}>
        <div className="w-4/5 flex flex-col mx-auto gap-6 pt-10 pb-6">
          <ChatMessage
            from="agent"
            content="Pariatur nisi fugiat ut nisi sint voluptate. Nostrud mollit laboris est dolore consequat esse est nostrud consectetur officia. Officia eiusmod non excepteur deserunt velit do ea voluptate magna sit aliquip amet exercitation. Do deserunt aliquip eiusmod eiusmod. Lorem adipisicing duis labore excepteur ea anim. Adipisicing quis commodo nulla excepteur qui labore voluptate ipsum occaecat. Ad dolor mollit duis anim aliquip est commodo occaecat ut occaecat amet ex."
          />
          <ChatMessage
            from="client"
            content="Non nisi Lorem sunt id cupidatat et laborum reprehenderit enim veniam ullamco anim. Velit occaecat labore laboris et duis consectetur esse culpa pariatur do in in ea. Sit eiusmod incididunt exercitation reprehenderit minim aliqua labore eu nulla duis quis proident qui. In dolor ut aliqua qui sit sit tempor eiusmod cupidatat exercitation incididunt anim. Adipisicing velit nisi sint exercitation laborum sint cupidatat officia nisi incididunt. Fugiat cillum elit officia sit ut deserunt proident. Do eu esse qui veniam do officia ad dolor exercitation labore nulla est."
          />
        </div>
        <ScrollBar className="z-[100]" />
      </ScrollArea>
      {showGoToBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-orange/70 border-2 border-solid border-white text-white p-2 rounded-full shadow-md hover:bg-orange transition-all duration-200 ease-in-out z-[100]"
        >
          <ArrowBendRightDown size={12} weight="bold" />
        </button>
      )}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-50" />
    </div>
  );
};
export default MessagesStream;
