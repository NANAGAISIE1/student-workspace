const DocumentPage = ({
  params: { documentId },
}: {
  params: { documentId: string };
}) => {
  return <div>This is the {documentId}</div>;
};

export default DocumentPage;
