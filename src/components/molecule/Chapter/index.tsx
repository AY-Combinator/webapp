interface ChapterProps {
  name: string;
  order: number;
}

const Chapter = ({ name, order }: ChapterProps) => {
  return (
    <div className={`px-2 py-1 text-white gap-2 flex flex-col rounded-lg`}>
      <span className="font-archivo-black">Chapter {order}</span>
      <span className="font-archivo">{name}</span>
    </div>
  );
};
export default Chapter;
