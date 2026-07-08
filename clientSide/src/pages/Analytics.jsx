import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAnalytics } from "../services/analytics.service";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import InsightsCard from "../components/dashboard/InsightsCard";
import RecentPostsTable from "../components/dashboard/RecentPostsTable";
import TopBlogCard from "../components/dashboard/TopBlogCard";

const Analytics = () => {
  /*
  ==========================================================
  STATES
  ==========================================================
  */

  // First Page Load
  const [loading, setLoading] = useState(true);

  // Refresh Button Loading
  const [refreshing, setRefreshing] = useState(false);

  const [analytics, setAnalytics] = useState({
    stats: {},
    chart: [],
    topBlog: null,
    recentPosts: [],
    insights: [],
  });

  /*
  ==========================================================
  FETCH ANALYTICS
  ==========================================================
  */

  const fetchAnalytics = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await getAnalytics();

      console.log("Analytics Response :", data);

      setAnalytics(data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Unable to fetch analytics."
      );
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  /*
  ==========================================================
  PAGE LOAD
  ==========================================================
  */

  useEffect(() => {
    fetchAnalytics();
  }, []);

  /*
  ==========================================================
  INITIAL LOADER
  ==========================================================
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="text-white text-xl font-semibold animate-pulse">
          Loading Analytics Dashboard...
        </div>
      </div>
    );
  }

  /*
  ==========================================================
  UI
  ==========================================================
  */

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Dashboard Header */}

        <DashboardHeader />

        {/* Welcome Banner */}

        <WelcomeBanner
          userName="Ankit"
          stats={analytics.stats}
          loading={refreshing}
          onRefresh={() => fetchAnalytics(true)}
        />

        {/* Stats */}

        <StatsCards
          stats={analytics.stats}
        />

        {/* Chart */}

        <AnalyticsChart
          data={analytics.chart}
        />

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* Left */}

          <div className="lg:col-span-2">

            <RecentPostsTable
              posts={analytics.recentPosts}
            />

          </div>

          {/* Right */}

          <div>

            <TopBlogCard
              blog={analytics.topBlog}
            />

            <div className="mt-6">

              <InsightsCard
                insights={analytics.insights}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;