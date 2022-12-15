import _api from "./api"


export const loginEP = (data)=> _api.post("/auth/login",data);
export const signupEP = (data)=> _api.post("/auth/signup",data);
export const logoutEP = () => _api.get("/auth/logout");
export const verifyEP = () => _api.get("/auth/verify")





