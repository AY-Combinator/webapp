"use client";
import { useState } from "react";
import Logo from "@/components/atom/Logo";
import Navigation from "@/components/atom/Navigation";
import { DashboardNavigation } from "@/data/menus/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";
import Link from "next/link";


const Header = ({ enableFundingButton }: { enableFundingButton: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between items-center gap-4 py-6">
        <Logo />
        <div className="flex gap-4 items-center">
          <Navigation navigationItems={DashboardNavigation} />
          {
            !enableFundingButton ? (
              <TooltipProvider delayDuration={0}>
                <Tooltip open={!enableFundingButton && open} onOpenChange={setOpen}>
                  <TooltipTrigger asChild>
                    <Button
                      className={`rounded-sm bg-black text-background py-3 h-max hover:opacity-99 font-archivo font-medium ${!enableFundingButton ? "bg-gray-400 hover:bg-gray-400" : ""}`}
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
            ) : (
              <Link href="/apply-for-funding">
                <Button className="rounded-sm bg-black text-background py-3 h-max hover:opacity-99 font-archivo font-medium">Apply for Funding</Button>
              </Link>
            )
          }
        </div>
      </div>
    </header >
  );
};
export default Header;
