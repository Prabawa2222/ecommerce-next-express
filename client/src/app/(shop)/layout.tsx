import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ShopLayout({ children }: Props) {
  return (
    <div className="bg-brand-cod-gray-950 text-brand-alto-200 min-h-screen w-full">
      <main>{children}</main>
    </div>
  );
}
