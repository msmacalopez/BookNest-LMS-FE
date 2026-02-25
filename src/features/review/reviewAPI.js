import { apiProcessor } from "../../services/apiProcessor";

export const createReview = (borrowId, reviewData) => {
  return apiProcessor({
    method: "post",
    url: `/reviews/${borrowId}`,
    data: reviewData, // { rating, title, comment }
    isPrivate: true,
  });
};

export const fetchMyReviews = () => {
  return apiProcessor({
    method: "get",
    url: `/reviews/myreviews`,
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
