import React from "react";
import {useLocation, Navigate} from "react-router-dom";

export const CheckAuth = (props) => {
    let location = useLocation();
    const isAuth = () => {
        let accessToken = localStorage.getItem('token');
        if (accessToken && (new Date(localStorage.getItem('expiresIn')) > new Date())) {
            return true;
        }
        return false;
    }
    if (!isAuth()) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }
    return props.children;
}

