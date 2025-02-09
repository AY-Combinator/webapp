import NotEligible from "../../../components/organism/NotEligible";
import FundingEvaluation from "@/components/organism/FundingEvaluation";
const ApplyForFundingRoute = () => {
  // TODO: check if eligible for funding

  const eligible = true;
  const reason = "Because reason";

  if (!eligible) {
    return <NotEligible reason={reason} />;
  }

  // TODO: if eligible, show form
  return (
    <FundingEvaluation />
  );
};

export default ApplyForFundingRoute;
