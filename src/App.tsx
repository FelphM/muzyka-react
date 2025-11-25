import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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

// Admin Pages
import { DashboardPage as AdminDashboard } from './pages/admin/Dashboard';
import { OrdersPage as AdminOrders } from './pages/admin/Orders';
import { ProductsPage as AdminProducts } from './pages/admin/Products';
import { UsersPage as AdminUsers } from './pages/admin/Users';
import { CategoriesPage as AdminCategories } from './pages/admin/Categories';
import { ReportsPage as AdminReports } from './pages/admin/Reports';
import { AdminProfilePage as AdminProfile } from './pages/admin/Profile';


import './styles/global.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPostDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:slug" element={<ProductDetails />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/profile" element={<AdminProfile />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
