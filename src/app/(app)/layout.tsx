import VisitorFooter from "@/components/VisitorFooter";
import VisitorNav from "@/components/VisitorsNav";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <body>
      <VisitorNav />
      <main className="flex-1">
        {children}
         <SpeedInsights />
      </main>
      <VisitorFooter />
      </body>
    </div>
  );
}