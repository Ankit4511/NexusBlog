import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, Bounce } from "react-toastify";

import Context from "./context/Context.jsx";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBlog from "./pages/AddBlog";
import Profile from "./pages/Profile";
import SavedBlogs from "./pages/SavedBlogs";
import BlogDetail from "./pages/BlogDetail";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import BottomNavbar from "./components/BottomNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
  const auth = useContext(Context);
  console.log("APP:", auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-purple-500/30 selection:text-white">
      <Navbar />

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/user/:id" element={<UserProfile />} />

        <Route
          path="/login"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/profile" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/profile" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedBlogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addblog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />

        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNavbar />
    </div>
  );
};

export default App;
