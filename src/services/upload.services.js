import _api from "./api"


export const uploadSingleEP = (data)=> _api.post("/upload/single",data);

