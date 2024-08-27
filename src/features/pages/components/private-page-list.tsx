"use client";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePage } from "../hooks/use-page";
import { toast } from "sonner";
import { Node } from "../types/page-list";
import PagesList from "./pages-list";

const PrivatePages = () => {
  const pathname = usePathname();
  const { getPrivatePagesByWorkspaceId, storedWorkspaceId } = usePage();
  const {
    error,
    pages: privatePages,
    isError,
    isPending,
  } = getPrivatePagesByWorkspaceId();

  if (isError) {
    toast.error("Failed to fetch private pages");
    console.error(error);
  }

  if (privatePages?.length === 0) {
    return null;
  }

  const nodes = privatePages?.map((page) => ({
    name: page.title,
    emoji: page.emoji,
    id: page._id,
  }));

  const privateLists: Node[] = [
    {
      name: "Private",
      id: "private",
      children: nodes,
    },
  ];

  return (
    <>
      {isPending ? (
        <ul className="m-0 list-none">
          <li className="flex w-full items-center py-1">
            <Button variant={"ghost"} className="p-1" size={"sm"}>
              <ChevronRight className="size-4" />
            </Button>
            <Skeleton className="h-9 w-full" />
          </li>
        </ul>
      ) : (
        nodes && <PagesList data={privateLists} workspace={storedWorkspaceId} />
      )}
    </>
  );
};

export default PrivatePages;
