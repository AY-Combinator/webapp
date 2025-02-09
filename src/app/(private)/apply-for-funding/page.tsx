import NotEligible from "../../../components/organism/NotEligible";
import FundingEvaluation from "@/components/organism/FundingEvaluation";
import { getUserProject } from "@/actions/project.actions";
import { getUserId } from "@/actions/user.actions";
import { POINTS_TO_UNLOCK_FUNDING } from "../../../../constants";

const ApplyForFundingRoute = async () => {
  const project = await getUserProject();
  const userId = await getUserId();

  if ((project.project?.cumulativeProgress?.earnedPoints ?? 0) < POINTS_TO_UNLOCK_FUNDING) {
    return (
      <NotEligible title="Wow, where are you running to?" reason="Please finish all modules to apply for funding" />
    );
  }

  // TODO: fetch reason from backend
  const reason = "Because reason";

  if (project.project?.eligibleForFunding === false) {
    return <NotEligible title="Sorry, you are not eligible for funding" reason={reason} />;
  }

  // TODO: if eligible, show form
  return <FundingEvaluation userId={userId || ""} />;
};

export default ApplyForFundingRoute;
