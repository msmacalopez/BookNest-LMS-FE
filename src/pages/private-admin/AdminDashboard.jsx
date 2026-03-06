import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminCreateBorrowByQueryAction } from "../../features/borrow/borrowAction";
import {
  fetchDashboardBorrowStatsAPI,
  fetchBorrowingTrendsAPI,
  fetchCategoryDistributionAPI,
  fetchLanguageDistributionAPI,
  fetchTypeEditionDistributionAPI,
} from "../../features/stats/statsAPI.js";

// Stats
import StatsCard from "../../components/StatsCard.jsx";
import BorrowingTrendsChart from "../../components/BorrowingTrendsChart.jsx";
import CategoryDistributionChart from "../../components/CategoryDistributionChart.jsx";
import BarChartComponent from "../../components/BarChartComponent.jsx";

const nf = new Intl.NumberFormat();

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [range, setRange] = useState("all");
  const [memberStatus, setMemberStatus] = useState("active");
  const [adminStatus, setAdminStatus] = useState("active");

  const [data, setData] = useState({
    loading: true,
    now: { borrowedNow: 0, overdueNow: 0, holdsNow: 0 },
    totals: { borrowedCount: 0, returnedCount: 0, range: "all" },
    books: { booksActive: 0, booksInactive: 0 },
    users: {
      membersTotal: 0,
      membersByStatus: { status: "active", count: 0 },
      adminsTotal: 0,
      adminsByStatus: { status: "active", count: 0 },
    },
  });

  useEffect(() => {
    const run = async () => {
      setData((s) => ({ ...s, loading: true }));

      const resp = await fetchDashboardBorrowStatsAPI({
        range,
        memberStatus,
        adminStatus,
      });

      if (resp?.status === "success") {
        setData({
          loading: false,
          now: resp.data?.now || {
            borrowedNow: 0,
            overdueNow: 0,
            holdsNow: 0,
          },
          totals: resp.data?.totals || {
            borrowedCount: 0,
            returnedCount: 0,
            range,
          },
          books: resp.data?.books || {
            booksActive: 0,
            booksInactive: 0,
          },
          users: resp.data?.users || {
            membersTotal: 0,
            membersByStatus: { status: memberStatus, count: 0 },
            adminsTotal: 0,
            adminsByStatus: { status: adminStatus, count: 0 },
          },
        });
      } else {
        setData((s) => ({ ...s, loading: false }));
      }
    };

    run();
  }, [range, memberStatus, adminStatus]);

  const borrowedNow = data.now?.borrowedNow ?? 0;
  const overdueNow = data.now?.overdueNow ?? 0;
  const holdsNow = data.now?.holdsNow ?? 0;

  const borrowedCount = data.totals?.borrowedCount ?? 0;
  const returnedCount = data.totals?.returnedCount ?? 0;

  const booksActive = data.books?.booksActive ?? 0;
  const booksInactive = data.books?.booksInactive ?? 0;

  const membersTotal = data.users?.membersTotal ?? 0;
  const membersByStatusCount = data.users?.membersByStatus?.count ?? 0;

  const adminsTotal = data.users?.adminsTotal ?? 0;
  const adminsByStatusCount = data.users?.adminsByStatus?.count ?? 0;

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
    { value: "deactivated", label: "Deactivated" },
  ];

  const [chartsRange, setChartsRange] = useState("14");
  const [borrowingData, setBorrowingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [chartsLoading, setChartsLoading] = useState(true);

  useEffect(() => {
    const runCharts = async () => {
      setChartsLoading(true);

      const [borrowingResp, categoryResp] = await Promise.all([
        fetchBorrowingTrendsAPI({ range: chartsRange }),
        fetchCategoryDistributionAPI(),
      ]);

      if (borrowingResp?.status === "success") {
        setBorrowingData(borrowingResp.data || []);
      } else {
        setBorrowingData([]);
      }

      if (categoryResp?.status === "success") {
        setCategoryData(categoryResp.data || []);
      } else {
        setCategoryData([]);
      }

      setChartsLoading(false);
    };

    runCharts();
  }, [chartsRange]);

  const [languageData, setLanguageData] = useState([]);
  const [typeEditionData, setTypeEditionData] = useState([]);
  const [barsLoading, setBarsLoading] = useState(true);

  useEffect(() => {
    const runBars = async () => {
      setBarsLoading(true);

      const [languageResp, typeEditionResp] = await Promise.all([
        fetchLanguageDistributionAPI(),
        fetchTypeEditionDistributionAPI(),
      ]);

      if (languageResp?.status === "success") {
        setLanguageData(languageResp.data || []);
      } else {
        setLanguageData([]);
      }

      if (typeEditionResp?.status === "success") {
        setTypeEditionData(typeEditionResp.data || []);
      } else {
        setTypeEditionData([]);
      }

      setBarsLoading(false);
    };

    runBars();
  }, []);

  const [borrowForm, setBorrowForm] = useState({
    memberQuery: "",
    bookQuery: "",
  });

  const [borrowLoading, setBorrowLoading] = useState(false);

  const handleBorrowInputChange = (e) => {
    const { name, value } = e.target;
    setBorrowForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminBorrowSubmit = async (e) => {
    e.preventDefault();

    const memberQuery = borrowForm.memberQuery.trim();
    const bookQuery = borrowForm.bookQuery.trim();

    if (!memberQuery || !bookQuery) {
      toast.error("Please enter member email or phone, and book ISBN.");
      return;
    }

    setBorrowLoading(true);

    try {
      const res = await dispatch(
        adminCreateBorrowByQueryAction({
          memberQuery,
          bookQuery,
        })
      );

      console.log("admin borrow response:", res);

      if (res?.status === "success") {
        toast.success(res.message || "Book borrowed successfully.");
        setBorrowForm({
          memberQuery: "",
          bookQuery: "",
        });

        const refreshed = await fetchDashboardBorrowStatsAPI({
          range,
          memberStatus,
          adminStatus,
        });

        if (refreshed?.status === "success") {
          setData({
            loading: false,
            now: refreshed.data?.now || {
              borrowedNow: 0,
              overdueNow: 0,
              holdsNow: 0,
            },
            totals: refreshed.data?.totals || {
              borrowedCount: 0,
              returnedCount: 0,
              range,
            },
            books: refreshed.data?.books || {
              booksActive: 0,
              booksInactive: 0,
            },
            users: refreshed.data?.users || {
              membersTotal: 0,
              membersByStatus: { status: memberStatus, count: 0 },
              adminsTotal: 0,
              adminsByStatus: { status: adminStatus, count: 0 },
            },
          });
        }
      } else {
        toast.error(res?.message || "Could not complete borrow.");
      }
    } catch (error) {
      console.error("Borrow submit failed:", error);
      toast.error(error?.message || "Borrow failed.");
    } finally {
      setBorrowLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Top section */}
      <div className="flex flex-wrap items-start gap-4 md:gap-6 mb-6 md:mb-8">
        <form
          onSubmit={handleAdminBorrowSubmit}
          className="fieldset bg-base-200 border border-base-300 rounded-box w-full md:max-w-[380px] md:min-w-[100px] md:flex-shrink-0 p-4"
        >
          <legend className="fieldset-legend text-lg text-accent">
            Borrow Tab
          </legend>

          <label className="label">Enter Member Email or Phone</label>
          <input
            type="text"
            name="memberQuery"
            value={borrowForm.memberQuery}
            onChange={handleBorrowInputChange}
            className="input input-bordered w-full"
            placeholder="e.g. member@email.com or 0412345678"
          />

          <label className="label mt-2">Enter Book ISBN or Scan</label>
          <input
            type="text"
            name="bookQuery"
            value={borrowForm.bookQuery}
            onChange={handleBorrowInputChange}
            className="input input-bordered w-full"
            placeholder="e.g. 1232434988876X"
          />

          <button
            type="submit"
            className={`btn btn-primary mt-4 ${
              borrowLoading ? "btn-disabled" : ""
            }`}
            disabled={borrowLoading}
          >
            {borrowLoading ? "Processing..." : "Rent to User"}
          </button>
        </form>

        <div className="flex flex-wrap gap-4 md:gap-6 flex-1">
          <div className="flex-1 min-w-[200px] max-w-[280px]">
            <StatsCard
              title="Borrows"
              value={data.loading ? "…" : nf.format(borrowedNow)}
              color="#3b82f6"
              subtitle="Currently borrowed"
              footerText="Live status"
            />
          </div>

          <div className="flex-1 min-w-[200px] max-w-[280px]">
            <StatsCard
              title="Overdues"
              value={data.loading ? "…" : nf.format(overdueNow)}
              color="#ef4444"
              subtitle="Need attention"
              footerText="Live status"
            />
          </div>

          <div className="flex-1 min-w-[200px] max-w-[280px]">
            <StatsCard
              title="Holds"
              value={data.loading ? "…" : nf.format(holdsNow)}
              color="#8b5cf6"
              subtitle="Currently active"
              footerText="Live status"
            />
          </div>
        </div>
      </div>

      {/* Top Stat Cards - second row only */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <StatsCard
            title="Borrow & Return"
            color="#6366f1"
            rows={[
              {
                label:
                  range === "all" ? "Borrowed (Total)" : "Borrowed (In period)",
                value: data.loading ? "…" : nf.format(borrowedCount),
              },
              {
                label:
                  range === "all" ? "Returned (Total)" : "Returned (In period)",
                value: data.loading ? "…" : nf.format(returnedCount),
              },
            ]}
            dropdownValue={range}
            dropdownOptions={[
              { value: "all", label: "All time" },
              { value: "7", label: "Last 7 days" },
              { value: "14", label: "Last 14 days" },
              { value: "30", label: "Last 30 days" },
              { value: "180", label: "Last 6 months" },
            ]}
            onDropdownChange={setRange}
            footerText={
              range === "all" ? "All-time totals" : "Selected period totals"
            }
          />

          <StatsCard
            title="Books"
            color="#22c55e"
            rows={[
              {
                label: "Active Books",
                value: data.loading ? "…" : nf.format(booksActive),
              },
              {
                label: "Inactive Books",
                value: data.loading ? "…" : nf.format(booksInactive),
              },
            ]}
            footerText="Titles in catalog"
          />

          <StatsCard
            title="Members"
            color="#f59e0b"
            rows={[
              {
                label: "Members (Total)",
                value: data.loading ? "…" : nf.format(membersTotal),
              },
              {
                label: `Members (${memberStatus})`,
                value: data.loading ? "…" : nf.format(membersByStatusCount),
              },
            ]}
            dropdownValue={memberStatus}
            dropdownOptions={statusOptions}
            onDropdownChange={setMemberStatus}
            footerText="Member accounts"
          />

          <StatsCard
            title="Admins"
            color="#ef4444"
            rows={[
              {
                label: "Admins (Total)",
                value: data.loading ? "…" : nf.format(adminsTotal),
              },
              {
                label: `Admins (${adminStatus})`,
                value: data.loading ? "…" : nf.format(adminsByStatusCount),
              },
            ]}
            dropdownValue={adminStatus}
            dropdownOptions={statusOptions}
            onDropdownChange={setAdminStatus}
            footerText="Admin accounts"
          />
        </div>
      </div>

      {/* Middle */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1e293b]">
                Borrowing Trends
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
            Category Distribution
          </h2>

          {chartsLoading ? (
            <div className="w-full h-48 md:h-64 flex items-center justify-center text-sm text-gray-500">
              Loading chart...
            </div>
          ) : (
            <CategoryDistributionChart data={categoryData} />
          )}

          <div className="mt-6 space-y-2">
            {categoryData.map((item, index) => (
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

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-[#1e293b] mb-4 md:mb-6">
            Top Languages
          </h2>

          {barsLoading ? (
            <div className="w-full h-64 md:h-72 flex items-center justify-center text-sm text-gray-500">
              Loading chart...
            </div>
          ) : (
            <BarChartComponent
              data={languageData}
              dataKey="value"
              nameKey="name"
              color="#3b82f6"
              horizontal={true}
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-[#1e293b] mb-4 md:mb-6">
            Type Editions
          </h2>

          {barsLoading ? (
            <div className="w-full h-64 md:h-72 flex items-center justify-center text-sm text-gray-500">
              Loading chart...
            </div>
          ) : (
            <BarChartComponent
              data={typeEditionData}
              dataKey="value"
              nameKey="name"
              color="#f59e0b"
              horizontal={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
