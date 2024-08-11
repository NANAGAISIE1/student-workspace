import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="w-full aspect-[8/1]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default Banner;
