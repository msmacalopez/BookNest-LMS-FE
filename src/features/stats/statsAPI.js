//statsAPI.js
import { apiProcessor } from "../../services/apiProcessor";

export const fetchDashboardBorrowStatsAPI = ({
  range = "all",
  memberStatus = "active",
  adminStatus = "active",
}) => {
  return apiProcessor({
    method: "get",
    url: `/stats/dashboard/borrows`,
    params: { range, memberStatus, adminStatus },
    isPrivate: true,
  });
};

export const fetchBorrowingTrendsAPI = ({ range = "14" }) => {
  return apiProcessor({
    method: "get",
    url: "/stats/charts/borrowing-trends",
    params: { range },
    isPrivate: true,
  });
};

export const fetchCategoryDistributionAPI = () => {
  return apiProcessor({
    method: "get",
    url: "/stats/charts/category-distribution",
    isPrivate: true,
  });
};

export const fetchLanguageDistributionAPI = () => {
  return apiProcessor({
    method: "get",
    url: "/stats/charts/language-distribution",
    isPrivate: true,
  });
};

export const fetchTypeEditionDistributionAPI = () => {
  return apiProcessor({
    method: "get",
    url: "/stats/charts/type-edition-distribution",
    isPrivate: true,
  });
};
