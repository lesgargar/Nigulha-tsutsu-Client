import _api from "./api"


export const getAllStoreEP = ()=> _api.get("/stores");
export const createStoreEP = (data)=> _api.post("/stores/create",data);
export const getAllMyStoresEP = ()=> _api.get("/stores/myStores");
export const editStoreEP = (id,data)=> _api.patch(`/stores/${id}/edit`,data);
export const deleteStoreEP = (id)=> _api.delete(`/stores/${id}/delete`);
export const detailStoreEP = (id)=> _api.get(`/stores/${id}/detail`);