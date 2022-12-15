import _api from "./api"


export const getAllProductsEP = (id)=> _api.get(`/products/${id}/products`);
export const createProductsEP = (id,data)=> _api.post(`/products/${id}/createProduct`,data);
export const editProductEP = (id,data)=> _api.patch(`/products/${id}/edit`,data);
export const deleteProductEp = (id)=> _api.delete(`/products/${id}/delete`);
export const detailProductEP = (id)=> _api.get(`/products/${id}/detail`);









