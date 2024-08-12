"use client";
import { Loader2Icon, MoreHorizontal, UserIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getDocuments } from "@/actions/documents";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DocumentActions from "./document-actions";

const PrivateList = () => {
  const pathname = usePathname();
  // Remover anything before the last slash
  const segments = pathname.split("/");
  const segment = segments[segments.length - 1];
  const router = useRouter();

  const getData = async () => {
    const data = await getDocuments();
    return data;
  };

  const {
    data: documents,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: getData,
  });

  return (
    <Collapsible>
      <CollapsibleTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-full justify-between",
        })}
      >
        <p className="!mt-0">Private</p>
        <MoreHorizontal className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full pr-2">
        <ul className="list-none p-0 m-0 ml-2 w-full space-y-2">
          {isPending ? (
            <span className="text-muted-foreground text-sm">
              {" "}
              <Loader2Icon className="animate-spin" />
            </span>
          ) : isError ? (
            <span className="text-sm text-muted-foreground">
              Encountered an error please refresh the page
            </span>
          ) : (
            documents?.map((document) => (
              <li
                key={document.id}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: cn(
                    "w-full justify-between flex",
                    segment === document.id
                      ? "bg-accent text-accent-foreground"
                      : "",
                  ),
                })}
              >
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => router.push(`/app/${document.id}`)}
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  <p className="!mt-0">{document.title}</p>
                </Button>
                <DocumentActions documentId={document.id} />
              </li>
            ))
          )}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PrivateList;
