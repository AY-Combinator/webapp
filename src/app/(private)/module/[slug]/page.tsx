import { getModuleBySlug } from "@/actions/module.actions";
import Chat from "@/components/organism/Chat";
import { Suspense } from "react";
import { notFound } from "next/navigation";

// TODO: Add a loading skeleton, or even better, move chatHistory to separate table and fetch it separately in chat component
const Loading = () => {
  return <p>Loading...</p>;
};

const ModuleRoute = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const moduleData = await getModuleBySlug(slug);

  if (!moduleData) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Chat data={moduleData.module} />
    </Suspense>
  );
};

export default ModuleRoute;
