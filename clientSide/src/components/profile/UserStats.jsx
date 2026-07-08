const UserStats = ({ followersCount, followingCount, blogsCount }) => {
  const stats = [
    { label: "Followers", value: followersCount },
    { label: "Following", value: followingCount },
    { label: "Blogs", value: blogsCount },
  ];

  return (
    <div className="flex items-center gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-display text-xl font-extrabold text-white">
            {stat.value ?? 0}
          </p>
          <p className="text-xs text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;