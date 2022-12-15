import _api from "./api"


export const myProfileEP = ()=> _api.get("/user/myProfile");
export const editProfileEP = (data)=> _api.patch("/user/myProfile/edit", data);
export const editStoreEP = (data)=> _api.patch(`/user/edit`,data);
