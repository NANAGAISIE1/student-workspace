import Editor from "./_components/editor";

const DocumentPage = ({
  params: { documentId },
}: {
  params: { documentId: string };
}) => {
  return (
    <div className="w-full h-full">
      <Editor />
    </div>
  );
};

export default DocumentPage;
