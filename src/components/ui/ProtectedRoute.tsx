"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // If no user, or if the user is logged in but their email IS NOT yours:
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (user) {
        // Strict Authorization: Kick out anyone who isn't you
        if (user.email !== "darpit336@gmail.com") {
          alert("Unauthorized access attempt detected.");
          router.push("/");
        } else if (pathname === "/admin/login") {
          router.push("/admin");
        }
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Prevent flash of content if not logged in
  if (!user && pathname !== "/admin/login") {
    return null; 
  }

  return <>{children}</>;
}
