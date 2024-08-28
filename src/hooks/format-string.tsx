import { Doc } from "@convex/dataModel";
import { useCallback, useMemo } from "react";

export const useFormattedSearchResults = (
  searchResults: Doc<"pages">[] | undefined,
  search: string,
) => {
  const formatTitle = useCallback((title: string) => {
    const match = title.match(/^(.+) \(([^)]+)\)$/);
    if (match) {
      return (
        <>
          {match[1]}
          <span className="sr-only">({match[2]})</span>
        </>
      );
    }
    return title;
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchResults) return [];

    const filtered = searchResults.filter((result) =>
      result.title.toLowerCase().includes(search.toLowerCase()),
    );

    const uniqueResults = filtered.reduce((acc, current) => {
      const existingResult = acc.find((item) => item.title === current.title);
      if (!existingResult) {
        return acc.concat([current]);
      } else {
        return acc.concat([
          { ...current, title: `${current.title} (${current._id})` },
        ]);
      }
    }, [] as Doc<"pages">[]);

    return uniqueResults;
  }, [searchResults, search]);

  return { formatTitle, filteredResults };
};
