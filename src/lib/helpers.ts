const calculateProgressPercentage = ({
  points,
  maxPoints,
}: {
  points: number;
  maxPoints: number;
}) => {
  return (points / maxPoints) * 100;
};

const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/[^a-zA-Z0-9-_]/g, "_");
};

export { calculateProgressPercentage, sanitizeFileName };
