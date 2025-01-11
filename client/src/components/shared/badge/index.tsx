import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

export default function Badge({ title, className }: Props) {
  return (
    <div
      className={cn(
        " p-1 px-2 text-brand-white-200 bg-brand-black-900/80 rounded-sm uppercase text-[12px] leading-4",
        className
      )}
    >
      {title}
    </div>
  );
}
