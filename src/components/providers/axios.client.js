import axios from "axios";

const axiosApi = axios.create({
    baseURL: "http://localhost:8080/hk-sar-service/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


export default axiosApi;
