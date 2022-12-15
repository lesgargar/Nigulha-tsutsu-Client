import axios from 'axios';

const isProduction = process.env.NODE_ENV === "production";
const _api = axios.create({
    baseURL: isProduction ? process.env.REACT_APP_SERVER_URL_PROD :   process.env.REACT_APP_SERVER_URL_DEV,

})


_api.interceptors.request.use((config) => {
    // Retrieve the JWT token from the local storage
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }

    return config;
});



export default _api