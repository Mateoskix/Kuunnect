import { LogOut, User, FileText } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useCurrentUserImage } from "@/utils/hooks/user/useCurrentUserImage";
import { useGetUser } from "@/utils/hooks/user/useGetUser";
import { createClient } from "@/utils/supabase/client";

async function signOut() {
    console.log('signing out');
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/';
    }
  }

const ProfileMenu = () => {
  const userAvatar = useCurrentUserImage();
  const user = useGetUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user)
    return (
      <Link href="/auth/login">
        <div className="w-8 h-8 gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
          <User size={16} className="text-white" />
        </div>
      </Link>
    );
  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        {userAvatar ? (
          <Image
            className="w-8 h-8 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200"
            src={userAvatar}
            alt="User Avatar"
            width={32}
            height={32}
          />
        ) : (
          <div className="w-8 h-8 gradient rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        )}
      </button>

      {/* Profile Dropdown Menu */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200/60 py-2 z-50">
          <Link
            href="/myposts"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsProfileOpen(false)}
          >
            <FileText size={16} />
            <span>My posts</span>
          </Link>
          <hr className="my-2 border-gray-200" />
          <button onClick={() => signOut()} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
