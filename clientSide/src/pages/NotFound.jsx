import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-black text-white">404</h1>

      <p className="mt-4 text-xl font-semibold text-white">
        Page Not Found
      </p>

      <p className="mt-2 max-w-md text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold text-white hover:scale-105 transition"
      >
        <Home className="h-5 w-5" />
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;