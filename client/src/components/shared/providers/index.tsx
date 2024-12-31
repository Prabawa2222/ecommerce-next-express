"use client";

import { queryClient } from "@/lib/queryclient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
