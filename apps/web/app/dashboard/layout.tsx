import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarTrigger />
      <div className="w-full p-3 pl-1 md:p-6 md:pl-2">{children}</div>
    </SidebarProvider>
  );
}
