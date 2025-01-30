import { cookies } from "next/headers";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <ClerkProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SignedIn>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </SidebarProvider>
    </ClerkProvider>
  );
};

export default layout;
