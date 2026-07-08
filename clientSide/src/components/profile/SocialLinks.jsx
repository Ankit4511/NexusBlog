import { Github, Linkedin, Globe } from "lucide-react";

const SocialLinks = ({ github, linkedin, portfolio }) => {
  if (!github && !linkedin && !portfolio) return null;

  const links = [
    { href: github, icon: Github, label: "GitHub" },
    { href: linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: portfolio, icon: Globe, label: "Portfolio" },
  ].filter((link) => link.href);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map(({ href, icon: Icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;