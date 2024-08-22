"use client";
import { MoreHorizontal, UserIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DocumentActions from "./document-actions";
import { api } from "@convex/api";
import { useQuery } from "convex/react";

const PrivateList = () => {
  const pathname = usePathname();
  // Remover anything before the last slash
  const segments = pathname.split("/");
  const segment = segments[segments.length - 1];
  const router = useRouter();

  const documents = useQuery(api.documents.query.getDocuments);

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
          {documents?.map((document) => (
            <li
              key={document._id}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: cn(
                  "w-full justify-between flex",
                  segment === document._id
                    ? "bg-accent text-accent-foreground"
                    : "",
                ),
              })}
            >
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => router.push(`/app/${document._id}`)}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                <p className="!mt-0">{document.title}</p>
              </Button>
              <DocumentActions documentId={document._id} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PrivateList;
