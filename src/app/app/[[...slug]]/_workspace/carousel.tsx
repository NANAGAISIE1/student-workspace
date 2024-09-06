"use client";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn-ui/carousel";
import { api } from "@convex/api";
import { Id } from "@convex/dataModel";
import Link from "next/link";
import { useQueryWithStatus } from "@/services/convex-query";
import { formatRelative } from "date-fns";
import { Skeleton } from "@/components/shadcn-ui/skeleton";

type Props = {
  workspaceId: Id<"workspaces">;
};

const HomePageCarousel = ({ workspaceId }: Props) => {
  const { data: pages, isPending } = useQueryWithStatus(
    api.pages.query.getPagesByWorkspaceId,
    { workspaceId },
  );

  const sortedPages = pages?.sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <Carousel className="w-full max-w-4xl">
      <CarouselContent className="-ml-1">
        {isPending || !sortedPages
          ? Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <Card key={index} className="aspect-square">
                    <Skeleton className="h-full w-full" />
                  </Card>
                </div>
              </CarouselItem>
            ))
          : sortedPages.map((page) => {
              const updatedAt = formatRelative(page.updatedAt, new Date());
              return (
                <CarouselItem
                  key={page._id}
                  className="pl-1 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Link href={`/app/${workspaceId}/${page._id}`} className="">
                      <Card className="truncate hover:bg-accent">
                        <CardContent className="flex aspect-square flex-col justify-end p-2">
                          <div className="flex items-center space-x-1">
                            <span>{page.emoji}</span>
                            <p className="!mt-0 truncate font-heading font-bold">
                              {page.title}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {updatedAt}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              );
            })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomePageCarousel;
