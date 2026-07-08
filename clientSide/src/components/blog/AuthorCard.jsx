import { Link } from "react-router-dom";
import { UserCircle2, Mail, ArrowRight } from "lucide-react";

const AuthorCard = ({ author }) => {
  if (!author) return null;

  return (
    <div className="mt-14 rounded-2xl border border-white/10 bg-brand-card/70 p-6 backdrop-blur-xl">

      <div className="flex flex-wrap items-center justify-between gap-5">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
            <UserCircle2 className="h-9 w-9 text-white" />
          </div>

          <div className="flex-1">

            <p className="text-xs uppercase tracking-widest text-gray-500">
              Written By
            </p>

            <h3 className="mt-1 text-xl font-bold text-white">
              {author.name}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              {author.email}
            </div>

          </div>

        </div>

        {author._id && (
          <Link
            to={`/user/${author._id}`}
            className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Visit Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}

      </div>

    </div>
  );
};

export default AuthorCard;