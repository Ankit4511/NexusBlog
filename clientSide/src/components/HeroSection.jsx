import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Play, Clock } from 'lucide-react';
import UserDetail from './UserDetail';

const HeroSection = ({ featured }) => {
  if (!featured) return null;

  const readTime = `${Math.max(
    1,
    Math.ceil((featured.description?.split(' ').length || 0) / 200)
  )} min read`;

  return (
    <Link to={`/blog/${featured._id}`} className="block">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0d0d15] shadow-2xl group cursor-pointer">

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent z-10" />

        {/* Background Image */}
        <img
          src={featured.imgUrl}
          alt={featured.title}
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.35] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-end min-h-[340px] sm:min-h-[440px] p-6 sm:p-10 md:p-14 max-w-2xl space-y-4">

          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>

            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Featured Publication
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight group-hover:text-purple-300 transition-colors">
            {featured.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl line-clamp-3">
            {featured.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-semibold pt-2">

            <UserDetail id={featured.user} />

            <span>•</span>

            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime}
            </div>

            <span>•</span>

            <span>
              {new Date(featured.createdAt).toLocaleDateString()}
            </span>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">

            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20">
              <BookOpen className="h-4 w-4" />
              Start Reading
              <ArrowRight className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">
              <Play className="h-4 w-4 fill-white" />
              Watch Overview
            </div>

          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
      </div>
    </Link>
  );
};

export default HeroSection;