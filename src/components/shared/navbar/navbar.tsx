"use client"
import React from "react";
import { Orbit } from "lucide-react";
import Link from "next/link";
import ProfileMenu from "./components/profileMenu/profileMenu";

const Navbar = () => {

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient rounded-lg flex items-center justify-center">
                <Orbit className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold text-primary">Kuunnect</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
