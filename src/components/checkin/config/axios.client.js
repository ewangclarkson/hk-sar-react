import axios from "axios";

const axiosApi = axios.create({
    baseURL: "https://hong-kong-sar.onrender.com/hk-sar-service/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(localStorage.getItem("token") != null && {'Authorization': localStorage.getItem('token')})
    },
});


export default axiosApi;
