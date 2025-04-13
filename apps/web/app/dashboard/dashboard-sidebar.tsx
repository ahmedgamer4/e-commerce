import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Keyboard,
  Receipt,
  Box,
  ChartColumnIncreasing,
  ArrowUpCircleIcon,
  ChartArea,
  Crown,
} from "lucide-react";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Manage Products",
    url: "/dashboard/products",
    icon: Keyboard,
  },
  {
    title: "Manage Orders",
    url: "/dashboard/orders",
    icon: Receipt,
  },
  {
    title: "Manage Stock",
    url: "/dashboard/stock",
    icon: Box,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: ChartColumnIncreasing,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="font-semibold">
                <Crown className="h-8 w-8" />
                <span className="text-lg">Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
