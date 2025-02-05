import Sidebar from "@/components/SideBar";
import { getUser } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";
import { Models } from "node-appwrite";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) {
    return redirect("/signin");
  }

  return (
    <main className="flex w-full ">
      <Sidebar name={user.name} email={user.email} avatarUrl={user.avatar} />
      <div className="flex-1 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        {children}
      </div>
    </main>
  );
};

export default layout;
