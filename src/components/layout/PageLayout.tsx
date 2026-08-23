import { Outlet } from "react-router";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";

export function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
