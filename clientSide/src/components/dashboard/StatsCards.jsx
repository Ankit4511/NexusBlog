import {
  Eye,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Page Views",
      value: stats?.views || 0,
      subtitle: "Total blog views",
      icon: Eye,
      iconColor: "bg-blue-500/20 text-blue-400",
      gradient:
        "hover:border-blue-500/30 hover:bg-blue-500/5",
    },

    {
      title: "Likes",
      value: stats?.likes || 0,
      subtitle: "People liked your blogs",
      icon: Heart,
      iconColor: "bg-red-500/20 text-red-400",
      gradient:
        "hover:border-red-500/30 hover:bg-red-500/5",
    },

    {
      title: "Comments",
      value: stats?.comments || 0,
      subtitle: "Community engagement",
      icon: MessageCircle,
      iconColor: "bg-yellow-500/20 text-yellow-400",
      gradient:
        "hover:border-yellow-500/30 hover:bg-yellow-500/5",
    },

    {
      title: "Followers",
      value: stats?.followers || 0,
      subtitle: "Growing audience",
      icon: Users,
      iconColor: "bg-green-500/20 text-green-400",
      gradient:
        "hover:border-green-500/30 hover:bg-green-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={new Intl.NumberFormat().format(card.value)}
          subtitle={card.subtitle}
          icon={card.icon}
          iconColor={card.iconColor}
          gradient={card.gradient}
        />
      ))}

    </div>
  );
};

export default StatsCards;