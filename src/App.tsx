import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { NotFoundPage } from "./pages/404";
import { CartPage } from "./pages/Cart";
import { BlogPage } from "./pages/Blog";
import { LoginPage } from "./pages/Login";
import { SignUpPage } from "./pages/SignUp";
import { ResetPage } from "./pages/ResetPassword";
import { ProductDetails } from "./pages/ProductDetails";
import { BlogPostDetails } from "./pages/BlogPostDetails";
import { ContactPage } from "./pages/Contact";
import { AboutPage } from "./pages/About";
import { DashboardPage } from "./pages/admin/Dashboard";
import { OrdersPage } from "./pages/admin/Orders";
import { ProductsPage } from "./pages/admin/Products";
import { CategoriesPage } from "./pages/admin/Categories";
import { UsersPage } from "./pages/admin/Users";
import { ReportsPage } from "./pages/admin/Reports";
import { Profile } from "./pages/Profile";
import { PurchasesPage } from "./components/Purchases";
import { AdminProfilePage } from "./pages/admin/Profile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<LandingPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/blog" element={<BlogPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/reset" element={<ResetPage />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<Profile />}></Route>

        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/blog/:slug" element={<BlogPostDetails />} />

        {/* --------------------------------- */}
        <Route path="/admin" element={<DashboardPage />}></Route>
        <Route path="/admin/dashboard" element={<DashboardPage />}></Route>

        <Route path="/admin/orders" element={<OrdersPage />}></Route>

        <Route path="/admin/products" element={<ProductsPage />}></Route>

        <Route path="/admin/categories" element={<CategoriesPage />}></Route>

        <Route path="/admin/users" element={<UsersPage />}></Route>

        <Route path="/admin/reports" element={<ReportsPage />}></Route>

        <Route path="/admin/profile" element={<AdminProfilePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
