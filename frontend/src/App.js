import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import LandingPage from "@/components/landing/LandingPage";
import LoginPage from "@/components/auth/LoginPage";
import SignUpPage from "@/components/auth/SignUpPage";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHome from "@/components/dashboard/DashboardHome";
import StoresPage from "@/components/dashboard/StoresPage";
import NewStorePage from "@/components/dashboard/NewStorePage";
import BuilderPage from "@/components/builder/BuilderPage";
import StorePreviewPage from "@/components/store/StorePreviewPage";
import ShrineDemo from "@/pages/ShrineDemo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="stores" element={<StoresPage />} />
            <Route path="stores/new" element={<NewStorePage />} />
            <Route path="stores/:id" element={<StoresPage />} />
            <Route path="products" element={<DashboardHome />} />
            <Route path="analytics" element={<DashboardHome />} />
            <Route path="billing" element={<DashboardHome />} />
            <Route path="settings" element={<DashboardHome />} />
            <Route path="help" element={<DashboardHome />} />
          </Route>
          
          {/* Builder Route */}
          <Route path="/dashboard/builder" element={<BuilderPage />} />
          
          {/* Store Preview Route */}
          <Route path="/preview/:storeSlug" element={<StorePreviewPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
