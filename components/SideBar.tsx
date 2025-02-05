"use client"; // Mark as client component if using interactivity

import { NavItem } from "@/constant";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiSettings, FiUsers, FiLogOut } from "react-icons/fi";

const Sidebar = ({
  name,
  email,
  avatarUrl,
}: {
  name: string;
  email: string;
  avatarUrl?: string;
}) => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white  flex-col justify-between hidden md:flex">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/">
          <h1 className="text-2xl font-bold">Your Logo</h1>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {NavItem.map((item) => (
            <li key={item.url}>
              <Link
                href={item.url}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  pathname === item.url ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">
                  <item.icon />
                </span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        {!name || !email || !avatarUrl ? (
          <UserSectionSkeleton />
        ) : (
          <div className="flex items-center space-x-4">
            <Image
              src={avatarUrl || ""}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium truncate">{name}</p>
              <p className="text-sm text-gray-400 truncate">{email}</p>
            </div>
          </div>
        )}

        <button
          className="w-full mt-4 flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => {
            // Add logout logic using NextAuth or your auth provider
            // Example: await signOut();
          }}
        >
          <FiLogOut className="text-xl" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

const UserSectionSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 animate-pulse">
      <div className="bg-gray-300 rounded-full h-10 w-10" />
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded-md" />
        <div className="h-4 mt-1 bg-gray-300 rounded-md w-3/4" />
      </div>
    </div>
  );
};
