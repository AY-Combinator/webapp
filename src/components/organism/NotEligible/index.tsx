import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotEligible = ({ title, reason }: { title: string, reason: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg mb-10">{reason}</p>
      <Link href="/dashboard">
        <Button className="rounded-sm bg-accent-foreground text-background py-5 h-max hover:opacity-90 font-archivo font-medium">
          Go Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotEligible;
