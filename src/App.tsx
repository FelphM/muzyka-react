import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
// Header and Footer va a ser administrado a través de los layouts

import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

import { LandingPage as Landing } from './pages/Landing';
import About from './pages/About';
import { ContactPage as Contact } from './pages/Contact';
import { BlogPage as Blog } from './pages/Blog';
import Cart from './pages/Cart';
import { LoginPage as Login } from './pages/Login';
import { SignUpPage as SignUp } from './pages/SignUp';
import { ResetPage as ResetPassword } from './pages/ResetPassword';
import { Profile } from './pages/Profile';
import { ProductDetails } from './pages/ProductDetails';
import { BlogPostDetails } from './pages/BlogPostDetails';
import { NotFoundPage as NotFound } from './pages/404';
import { ChangePassword } from './pages/ChangePassword'; 
import { PurchasesPage } from './pages/Purchases'; 

// Paginas Admin
import { DashboardPage as AdminDashboard } from './pages/admin/Dashboard';
import { OrdersPage as AdminOrders } from './pages/admin/Orders';
import { ProductsPage as AdminProducts } from './pages/admin/Products';
import { UsersPage as AdminUsers } from './pages/admin/Users';
import { CategoriesPage as AdminCategories } from './pages/admin/Categories';
import { ReportsPage as AdminReports } from './pages/admin/Reports';


import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Header and Footer son administrados a través de MainLayout and AdminLayout */}
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Landing />} /> 
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:postId" element={<BlogPostDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="purchases" element={<PurchasesPage />} />
              <Route path="product/:slug" element={<ProductDetails />} />
            </Route>

            {/* Rutas de Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;