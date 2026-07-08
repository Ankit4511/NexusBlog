import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
      <span className="hover:text-white transition-colors cursor-pointer">
        Author Workspace
      </span>

      <ChevronRight size={14} />

      <span className="text-purple-400 font-semibold">
        Write New Article
      </span>
    </div>
  );
};

export default Breadcrumb;