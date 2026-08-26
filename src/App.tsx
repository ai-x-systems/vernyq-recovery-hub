import { Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";

// Page components
import HomePage from "@/app/page";
import CollectionPage from "@/app/cold-plunge-tubs/page";
import ProductDetailPage from "@/app/product/[slug]/page";
import CartPage from "@/app/cart/page";
import CheckoutPage from "@/app/checkout/page";
import OrderConfirmationPage from "@/app/order/[orderNumber]/page";
import TrackingPage from "@/app/tracking/page";
import SciencePage from "@/app/science/page";
import AboutPage from "@/app/about/page";
import FaqPage from "@/app/faq/page";
import ContactPage from "@/app/contact/page";
import ShippingPage from "@/app/shipping/page";
import WarrantyPage from "@/app/warranty/page";
import ReturnsPage from "@/app/returns/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import BlogPage from "@/app/blog/page";
import BlogArticlePage from "@/app/blog/[slug]/page";
import NotFoundPage from "@/app/not-found";

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cold-plunge-tubs" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/:orderNumber" element={<OrderConfirmationPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </CartProvider>
  );
}
