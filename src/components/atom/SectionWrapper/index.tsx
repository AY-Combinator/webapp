import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "flex p-6 flex-col gap-6 bg-white overflow-hidden border border-solid border-border shadow-lg w-full rounded-lg",
        className
      )}
    >
      {children}
    </section>
  );
};
export default SectionWrapper;
