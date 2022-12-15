import _api from "./api"


export const getAllReviewsEP = (id)=> _api.get(`/reviews/${id}/reviews`);
export const createReviewsEP = (id,data)=> _api.post(`/reviews/${id}/newReview`,data);
export const editReviewsStoreEP = (id,data)=> _api.patch(`/reviews/${id}/edit`,data);
export const deleteReviewsEP = (id)=> _api.delete(`/reviews/${id}/delete`);







