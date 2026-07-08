import { useState, useContext } from 'react';
import Context from '../context/Context.jsx';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User as UserIcon, Terminal } from 'lucide-react';
import { registerUser } from '../services/auth.service';

const Register = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await registerUser({
      name,
      email,
      password,
    });

    toast.success(response.message, {
      position: 'top-center',
      autoClose: 1500,
      theme: 'dark',
      transition: Bounce,
    });

    auth.setIsAuthenticated(true);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || 'Something went wrong',
      {
        position: 'top-center',
        autoClose: 1500,
        theme: 'dark',
        transition: Bounce,
      },
    );

    auth.setIsAuthenticated(false);
  }
};

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        theme="dark"
        transition={Bounce}
      />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-brand-dark/30 hero-gradient">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/[0.06] bg-brand-card/75 p-8 shadow-2xl backdrop-blur-xl">
          {/* Icon + Greeting */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 shadow-xl shadow-purple-500/20">
              <Terminal className="h-7 w-7 text-white" />
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 opacity-40 blur animate-pulse-glow"></div>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Join our developer community and start publishing your ideas
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-lg bg-white/[0.04] p-1 border border-white/[0.04]">
            <Link
              to="/login"
              className="flex-1 rounded-md py-1.5 text-sm font-semibold text-center text-gray-400 hover:text-white transition-all"
            >
              Sign In
            </Link>
            <span className="flex-1 rounded-md py-1.5 text-sm font-semibold text-center bg-purple-600/25 text-purple-300 border border-purple-500/10">
              Register
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ankit Sharma"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-11 pr-11 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/15 transition-transform active:scale-[0.98]"
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="text-center">
            <span className="text-xs text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-xs font-semibold text-purple-400 hover:text-purple-300">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
