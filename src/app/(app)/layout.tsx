import VisitorFooter from "@/components/VisitorFooter";
import VisitorNav from "@/components/VisitorsNav";

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <VisitorNav />
      <main className="flex-1">
        {children}
      </main>
      <VisitorFooter />
    </div>
  );
}