import { ScrollArea } from "@/components/ui/scroll-area";
import Banner from "./banner";
import { PlateEditor } from "./plate-editor";

type Props = {};

const Editor = (props: Props) => {
  return (
    <ScrollArea className="w-full flex flex-col h-full">
      <Banner />
      <PlateEditor />
    </ScrollArea>
  );
};

export default Editor;
