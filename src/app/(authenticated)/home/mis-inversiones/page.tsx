"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Content from "./_components/Content/Content";
import Header from "./_components/Header/Header";


export default function MyInvestmentsPage() {
  const session = useSession();

  if (!session.data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Content />
    </div>
  );
}
