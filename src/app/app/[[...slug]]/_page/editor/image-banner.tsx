import { Skeleton } from "@/components/shadcn-ui/skeleton";

type Props = {};

const ImageBanner = (props: Props) => {
  return (
    <div className="h-52">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default ImageBanner;
