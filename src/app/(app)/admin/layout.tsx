import AdminSidebar from "@/components/admin/SideNavbar";
import "@/app/globals.css";

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}