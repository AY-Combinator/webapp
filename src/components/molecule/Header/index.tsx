"use client";
import { useState } from "react";
import Logo from "@/components/atom/Logo";
import Navigation from "@/components/atom/Navigation";
import { DashboardNavigation } from "@/data/menus/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";


const Header = () => {
  const [open, setOpen] = useState(false);
  const finishedModules = false;

  return (
    <header>
      <div className="flex justify-between items-center gap-4 py-6">
        <Logo />
        <div className="flex gap-4 items-center">
          <Navigation navigationItems={DashboardNavigation} />
          <TooltipProvider delayDuration={0}>
            <Tooltip open={!finishedModules && open} onOpenChange={setOpen}>
              <TooltipTrigger asChild>
                <Button
                  className={`${finishedModules ? "" : "bg-gray-400 hover:bg-gray-400"}`}
                >
                  Apply for Funding
                </Button>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent className="bg-orange text-white text-center p-3 rounded-lg max-w-[250px] z-50">
                  Please finish all modules to apply for funding
                  <TooltipArrow className="fill-orange" />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header >
  );
};
export default Header;
