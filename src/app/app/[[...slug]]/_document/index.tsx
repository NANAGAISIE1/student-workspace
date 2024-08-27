import { Id } from "@convex/dataModel";

type Props = {
  id: Id<"pages">[];
};

const Page = ({ id }: Props) => {
  return <div>Page {id}</div>;
};

export default Page;
