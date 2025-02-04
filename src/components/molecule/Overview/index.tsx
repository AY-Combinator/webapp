import SectionWrapper from "@/components/atom/SectionWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tags from "../Tags";

const Overview = () => {
  return (
    <SectionWrapper className="flex-row gap-10 h-1/2">
      <div className="w-1/3"></div>
      <div className="flex flex-col gap-4 overflow-hidden w-2/3 py-3 justify-between">
        <ScrollArea className="w-full">
          <div className="flex flex-col gap-4 text-sm pr-2">
            <h2 className="font-archivo-black text-lg leading-none">
              Eiusmod labore nostrud ad irure aliqua sunt irure consectetur.
            </h2>
            <p>
              Excepteur duis consectetur cillum laboris amet nostrud culpa duis
              sunt in mollit nostrud. Aute cupidatat est proident voluptate id
              minim commodo nostrud labore Lorem dolor sint. In enim eiusmod
              excepteur exercitation officia et sunt deserunt incididunt irure
              duis consectetur amet. Ut enim dolore ullamco eu sit do elit
              incididunt anim nulla id occaecat. Ullamco ut dolor consectetur
              incididunt in voluptate non pariatur.
            </p>
            <p>
              Excepteur qui quis incididunt aliquip. Nisi mollit occaecat
              deserunt duis laboris Lorem duis veniam occaecat ex cillum sint
              dolor duis. Adipisicing nostrud minim dolor aliqua. Aute fugiat
              proident voluptate sunt eiusmod consectetur dolore culpa.
            </p>
            <p>
              Labore consectetur adipisicing aute velit sint anim incididunt
              elit aute. Non proident quis voluptate esse exercitation voluptate
              enim. Consectetur do ipsum reprehenderit fugiat commodo
              adipisicing id est aute laborum enim minim nisi.
            </p>
          </div>
        </ScrollArea>
        <Tags tags={["web3", "blockchain", "crypto wallet"]} />
      </div>
    </SectionWrapper>
  );
};
export default Overview;
