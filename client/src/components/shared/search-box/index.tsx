import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/user-debounce";
import { cn, delay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CATEGORY_FILTER, CATEGORY_FILTER_ICON_MAP } from "../navbar/constant";
import SearchResultLoading from "./search-result-loading";

// type Props = {};

export default function SearchBox() {
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const queryDebounced = useDebounce<string>(query, 500, "");

  const { data, isLoading } = useQuery({
    queryKey: ["search", queryDebounced],
    queryFn: async () => {
      // TODO: fetch actual data
      const mockdata = [
        {
          title: "Some Jeans",
          category: "jeans",
        },
        {
          title: "Some Shirt",
          category: "shirt",
        },
        {
          title: "Some T-Shirt",
          category: "tshirt",
        },
      ];
      await delay(1000);
      return mockdata;
    },
    enabled: queryDebounced !== "",
  });

  return (
    <div>
      {/* Search box */}
      <div className="flex items-center gap-1 w-full border-b-[0.5px] border-zinc-800 px-4 py-4">
        <div>
          <SearchIcon />
        </div>
        <div className="grow">
          <Input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none bg-transparent shadow-none outline-none focus-within:ring-0 focus-visible:ring-0 text-base sm:text-base"
          />
        </div>
      </div>
      {/* Filter */}
      <div className="flex items-start gap-4 px-4 py-4">
        <p className="text-xs py-2 uppercase font-medium">Category: </p>
        <div className="grow flex flex-wrap gap-2">
          {/* TODO: use real data from api instead */}
          {CATEGORY_FILTER.map((item) => (
            <Button
              key={item.name}
              size={"sm"}
              className={cn(
                " text-brand-white-200 bg-transparent shadow-md hover:bg-primary h-7 rounded-[2px]",
                selectedCategory === item.value &&
                  "bg-brand-white-200 text-brand-black-800 hover:bg-brand-white-200 hover:text-brand-black-800"
              )}
              onClick={() => setSelectedCategory(item.value)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>

      {/* search result */}
      {isLoading && (
        <div className="absolute top-full z-10 mt-3 w-full rounded-none bg-brand-black-800 py-5">
          <div className="space-y-5">
            <p className="px-4 uppercase font-medium">Top Match</p>
            <div className="flex items-center justify-center">
              <SearchResultLoading />
            </div>
          </div>
        </div>
      )}
      {/* TODO:Make it scrollable */}
      {!isLoading && data && (
        <div className="absolute top-full z-10 mt-3 w-full rounded-none bg-brand-black-800 py-5">
          <div className="space-y-5">
            <p className="px-4 uppercase font-medium">Top Match</p>

            {/* In case we have result */}
            {data.length > 0 && (
              <div className="flex flex-col gap-2">
                {data.map((item, idx) => {
                  const iconkey =
                    item.category as keyof typeof CATEGORY_FILTER_ICON_MAP;
                  const TagIcon = CATEGORY_FILTER_ICON_MAP[iconkey];

                  return (
                    <Link
                      // TODO: link to actual url
                      href={"#"}
                      key={idx}
                      className="flex w-full cursor-pointer items-start gap-3 px-5 py-3 hover:bg-zinc-800"
                    >
                      <TagIcon className="relative top-[0.28rem]" />
                      <div className="flex flex-col">
                        <p className="text-base line-clamp-1">{item.title}</p>
                        <p className="text-xs mt-1 font-bold capitalize">
                          {item.category}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* In case we have no result */}
            {data.length <= 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center flex-col px-5">
                  <p className="px-5 py-3">Oops, no results found</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
