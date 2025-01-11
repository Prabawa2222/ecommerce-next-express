"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export default function SortBy() {
  const searchparams = useSearchParams();
  const router = useRouter();

  const handleSortChange = async (sortby: string) => {
    const params = qs.parse(searchparams.toString());
    params["sortby"] = sortby;
    const url = qs.stringifyUrl(
      { url: "/search", query: params },
      { skipNull: true }
    );
    router.push(url, { scroll: false });
  };

  return (
    <Select defaultValue={"createdAt"} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[200px] border-b-[0.5px] border-zinc-700/80 shadow-none rounded-sm text-xs text-white space-x-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-brand-white-200 border-b-[0.5px] border-zinc-700/80 bg-brand-black-800 rounded-sm">
        <SelectItem className="text-xs" value="createdAt">
          Date, from new to old
        </SelectItem>
        <SelectItem className="text-xs" value="-createdAt">
          Date, from old to new
        </SelectItem>
        <SelectItem className="text-xs" value="price">
          Price, from low to high
        </SelectItem>
        <SelectItem className="text-xs" value="-price">
          Price, from high to low
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
