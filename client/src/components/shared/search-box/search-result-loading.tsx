import { ReloadIcon } from "@radix-ui/react-icons";

export default function SearchResultLoading() {
  return (
    <div className="flex items-center justify-center flex-col px-5">
      <ReloadIcon className="my-2 size-10 animate-spin text-brand-white-200" />
      <p className="text-muted-foreground">Browsing the entire database</p>
    </div>
  );
}
