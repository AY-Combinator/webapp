import { getUserProject } from "@/actions/project.actions";
import Header from "@/components/molecule/Header";
import { POINTS_TO_UNLOCK_FUNDING } from "../../../constants";

export default async function PrivateViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const project = await getUserProject();

  return (
    <div className="flex h-full min-h-screen">
      <div className="flex flex-col justify-between w-full h-auto ~px-6/10 bg-golden-sand-gradient">
        <Header enableFundingButton={(project?.project?.cumulativeProgress?.earnedPoints ?? 0) >= POINTS_TO_UNLOCK_FUNDING} />
        <main className="flex-1 w-full h-full">{children}</main>
      </div>
    </div>
  );
}
