import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentLoggedInUser();

  if (!currentUser) {
    return redirect("/login");
  }

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header
          ownerId={currentUser.ownerId}
          accountId={currentUser.accountId}
        />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
}
