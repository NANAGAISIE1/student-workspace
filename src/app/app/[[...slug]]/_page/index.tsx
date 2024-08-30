import { Id } from "@convex/dataModel";
import ImageBanner from "./image-banner";

type Props = {
  id: Id<"pages">[];
};

const Page = ({ id }: Props) => {
  return (
    <div className="flex flex-col">
      <ImageBanner />
      Page {id}
    </div>
  );
};

export default Page;
