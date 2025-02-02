const calculateProgressPercentage = ({
  points,
  maxPoints,
}: {
  points: number;
  maxPoints: number;
}) => {
  return (points / maxPoints) * 100;
};

export { calculateProgressPercentage };
