import { AuthProvider } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { Metadata } from "next";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Admin Panel | Abhigyan",
  robots: { index: false, follow: false }
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
      </ProtectedRoute>
    </AuthProvider>
  );
}
