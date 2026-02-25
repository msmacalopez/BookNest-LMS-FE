import { apiProcessor } from "../../services/apiProcessor";

export const createReview = (borrowId, reviewData) => {
  return apiProcessor({
    method: "post",
    url: `/reviews/${borrowId}`,
    data: reviewData, // { rating, title, comment }
    isPrivate: true,
  });
};

export const fetchMyReviews = ({ page = 1, limit = 10 } = {}) => {
  return apiProcessor({
    method: "get",
    url: `/reviews/myreviews?page=${page}&limit=${limit}`,
    isPrivate: true,
  });
};

// list public books reviews
export const fetchReviewsByBook = (bookId) => {
  return apiProcessor({
    method: "get",
    url: `/reviews/book/${bookId}`,
  });
};
