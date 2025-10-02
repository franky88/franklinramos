import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <main className="w-full min-h-screen px-2 py-2">
        <SidebarTrigger />
        {children}
        <Toaster position="top-right" />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
