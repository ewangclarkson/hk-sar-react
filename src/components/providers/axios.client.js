import axios from "axios";

const axiosApi = axios.create({
    baseURL: "https://hk-sar.onrender.com/hk-sar-service/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


export default axiosApi;
