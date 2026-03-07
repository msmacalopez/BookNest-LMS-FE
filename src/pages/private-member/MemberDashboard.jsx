import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard.jsx";
import DueBookCard from "../../components/DueBookCard.jsx";
import BorrowingTrendsChart from "../../components/BorrowingTrendsChart.jsx";
import CategoryDistributionChart from "../../components/CategoryDistributionChart.jsx";
import RecommendedBooks from "../../components/RecommendedBooks.jsx";
import {
  fetchMemberDashboardStatsAPI,
  fetchMemberBorrowingTrendsAPI,
  fetchMemberGenreDistributionAPI,
  fetchMemberRecommendationsAPI,
} from "../../features/stats/statsAPI.js";

const nf = new Intl.NumberFormat();

const MemberDashboard = () => {
  const [data, setData] = useState({
    loading: true,
    nextDue: null,
    live: {
      borrowedNow: 0,
      overdueNow: 0,
      holdsNow: 0,
      memberStatus: "active",
    },
    totals: {
      totalBorrowed: 0,
      totalReturned: 0,
      reviewsWritten: 0,
      favoriteGenre: "No reading history yet",
    },
  });

  const [chartsRange, setChartsRange] = useState("14");
  const [borrowingData, setBorrowingData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [chartsLoading, setChartsLoading] = useState(true);

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);

  useEffect(() => {
    const runStats = async () => {
      setData((s) => ({ ...s, loading: true }));

      const resp = await fetchMemberDashboardStatsAPI();

      if (resp?.status === "success") {
        setData({
          loading: false,
          nextDue: resp.data?.nextDue || null,
          live: resp.data?.live || {
            borrowedNow: 0,
            overdueNow: 0,
            holdsNow: 0,
            memberStatus: "active",
          },
          totals: resp.data?.totals || {
            totalBorrowed: 0,
            totalReturned: 0,
            reviewsWritten: 0,
            favoriteGenre: "No reading history yet",
          },
        });
      } else {
        setData((s) => ({ ...s, loading: false }));
      }
    };

    runStats();
  }, []);

  useEffect(() => {
    const runCharts = async () => {
      setChartsLoading(true);

      const [borrowingResp, genreResp] = await Promise.all([
        fetchMemberBorrowingTrendsAPI({ range: chartsRange }),
        fetchMemberGenreDistributionAPI(),
      ]);

      if (borrowingResp?.status === "success") {
        setBorrowingData(borrowingResp.data || []);
      } else {
        setBorrowingData([]);
      }

      if (genreResp?.status === "success") {
        setGenreData(genreResp.data || []);
      } else {
        setGenreData([]);
      }

      setChartsLoading(false);
    };

    runCharts();
  }, [chartsRange]);

  useEffect(() => {
    const runRecommendations = async () => {
      setRecommendationsLoading(true);

      const resp = await fetchMemberRecommendationsAPI();

      if (resp?.status === "success") {
        setRecommendations(resp.data || []);
      } else {
        setRecommendations([]);
      }

      setRecommendationsLoading(false);
    };

    runRecommendations();
  }, []);

  const borrowedNow = data.live?.borrowedNow ?? 0;
  const overdueNow = data.live?.overdueNow ?? 0;
  const holdsNow = data.live?.holdsNow ?? 0;
  const memberStatus = data.live?.memberStatus || "active";

  const totalBorrowed = data.totals?.totalBorrowed ?? 0;
  const totalReturned = data.totals?.totalReturned ?? 0;
  const reviewsWritten = data.totals?.reviewsWritten ?? 0;
  const favoriteGenre = data.totals?.favoriteGenre || "No reading history yet";

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#22c55e"; // green
      case "inactive":
        return "#6b7280"; // gray
      case "suspended":
        return "#f59e0b"; // amber
      case "deactivated":
        return "#ef4444"; // red
      case "pending":
        return "#8b5cf6"; // violet
      default:
        return "#3b82f6"; // blue
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Important due card */}
      <DueBookCard nextDue={data.nextDue} loading={data.loading} />

      {/* Top row */}
      <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Borrowed"
            value={data.loading ? "…" : nf.format(borrowedNow)}
            color="#3b82f6"
            subtitle="Currently borrowed"
            footerText="Live status"
          />
        </div>

        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Overdue"
            value={data.loading ? "…" : nf.format(overdueNow)}
            color="#ef4444"
            subtitle="Need attention"
            footerText="Live status"
          />
        </div>

        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Holds"
            value={data.loading ? "…" : nf.format(holdsNow)}
            color="#8b5cf6"
            subtitle="Currently active"
            footerText="Live status"
          />
        </div>

        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Status"
            value={data.loading ? "…" : memberStatus}
            color={getStatusColor(memberStatus)}
            subtitle="Member account"
            footerText="Account status"
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Total Borrowed"
            value={data.loading ? "…" : nf.format(totalBorrowed)}
            color="#6366f1"
            subtitle="All time"
            footerText="Borrow history"
          />
        </div>

        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Returned"
            value={data.loading ? "…" : nf.format(totalReturned)}
            color="#22c55e"
            subtitle="Completed borrows"
            footerText="Borrow history"
          />
        </div>

        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Reviews Written"
            value={data.loading ? "…" : nf.format(reviewsWritten)}
            color="#f59e0b"
            subtitle="Published reviews"
            footerText="Your activity"
          />
        </div>

        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <StatsCard
            title="Favorite Genre"
            value={data.loading ? "…" : favoriteGenre}
            color="#14b8a6"
            subtitle="Based on history"
            footerText="Reading preference"
          />
        </div>
      </div>

      {/* Middle charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1e293b]">
                My Reading Activity
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Books borrowed vs returned over time
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                  <span className="text-sm text-gray-600">Borrowed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <span className="text-sm text-gray-600">Returned</span>
                </div>
              </div>

              <select
                value={chartsRange}
                onChange={(e) => setChartsRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              >
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
                <option value="180">Last 6 months</option>
              </select>
            </div>
          </div>

          {chartsLoading ? (
            <div className="w-full h-64 md:h-80 flex items-center justify-center text-sm text-gray-500">
              Loading chart...
            </div>
          ) : (
            <BorrowingTrendsChart data={borrowingData} />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-[#1e293b] mb-4 md:mb-6">
            My Genres
          </h2>

          {chartsLoading ? (
            <div className="w-full h-48 md:h-64 flex items-center justify-center text-sm text-gray-500">
              Loading chart...
            </div>
          ) : (
            <CategoryDistributionChart data={genreData} />
          )}

          <div className="mt-6 space-y-2">
            {genreData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-[#1e293b]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <RecommendedBooks
        books={recommendations}
        loading={recommendationsLoading}
      />
    </div>
  );
};

export default MemberDashboard;
