"use client";
import Head from "next/head";
import { usePathname } from "next/navigation";
export default function HomeLayout({ children }) {
  const pathname = usePathname();
  return (
    <main>{children}</main>
  );
}
