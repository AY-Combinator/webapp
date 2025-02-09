const NotEligible = ({ reason }: { reason: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Sorry, you are not eligible for funding</h1>
      <p className="text-lg">{reason}</p>
    </div>
  );
};

export default NotEligible;
