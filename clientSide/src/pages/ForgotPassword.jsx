import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Terminal } from "lucide-react";
import { forgotPassword } from "../services/auth.service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      toast.success(response.message);
      setSent(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again.",
        { position: "top-center", autoClose: 1500, theme: "dark", transition: Bounce },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} theme="dark" transition={Bounce} />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-brand-dark/30 hero-gradient">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/[0.06] bg-brand-card/75 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 shadow-xl shadow-purple-500/20">
              <Terminal className="h-7 w-7 text-white" />
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 opacity-40 blur animate-pulse-glow"></div>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-400">Enter your email and we'll send you a link to reset your password</p>
          </div>

          {sent ? (
            <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-4 text-center text-sm text-gray-300">
              Check your inbox for the reset link. It's valid for 15 minutes.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
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
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/15 transition-transform active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="text-center">
            <Link to="/login" className="text-xs font-semibold text-purple-400 hover:text-purple-300">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;