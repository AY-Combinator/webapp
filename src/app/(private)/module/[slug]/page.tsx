import { getModuleBySlug } from "@/actions/module.actions";
import Chat from "@/components/organism/Chat";

import { notFound } from "next/navigation";

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

  return <Chat data={moduleData.module} />;
};

export default ModuleRoute;
