import Navbar from "@/components/shared/navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ShopLayout({ children }: Props) {
  return (
    <div className="bg-brand-black-900 text-brand-white-200 min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
