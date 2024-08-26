import { Id } from "@convex/dataModel";

type Props = {
  id: Id<"documents">[];
};

const Document = ({ id }: Props) => {
  return <div>Document {id}</div>;
};

export default Document;
