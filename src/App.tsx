
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { pageview, trackVisitorPage, endVisitorSession } from "@/lib/analytics";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./pages/ProtectedRoute";
import PaymentOptions from "./pages/PaymentOptions";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    pageview(path, document.title);

    const sendVisitorPage = async () => {
      await trackVisitorPage(path);
    };
    sendVisitorPage();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        endVisitorSession();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Analytics />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<PaymentOptions />} />
            <Route path="/pricing/*" element={<PaymentOptions />} />
            <Route path="/payment" element={<PaymentOptions />} />
            <Route path="/payment/*" element={<PaymentOptions />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/*" element={<Booking />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
