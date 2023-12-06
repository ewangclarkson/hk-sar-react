import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "./axios.client";
import PropTypes from "prop-types";

const useFetch = ({url}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);


    const fetchData = useCallback(async () => {
        try {
            const response = await axiosApi({'method': 'GET', 'url': url});
            const data = await response.data;
            setData(Array.isArray(data) ? data : [data]);
           setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(true)
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url, fetchData]);


    return {
        loading,
        error,
        data
    }
};
useFetch.propTypes = {
    url: PropTypes.string.isRequired,
};

export default useFetch;
