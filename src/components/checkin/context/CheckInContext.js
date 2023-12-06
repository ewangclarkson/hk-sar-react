import React, {useState} from "react";
import axiosApi from "../config/axios.client";
import {useLocation, useNavigate} from "react-router-dom";

const CheckInContext = React.createContext(null);

export const CheckInProvider = (props) => {

    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = React.useState('');
    const [toggleSignIn, setToggleSignIn] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();


    const switchCheckIn = (value) => {
        setError(false);
        setSuccess(false);
        setToggleSignIn(value);
    }

    const login = async (user) => {
        let from = location.state?.from?.pathname || '/home';
        setLoading(true);
        try {
            const resp = await axiosApi({'method': 'POST', 'url': "api/public/login", data: user});
            const auth = await resp.data;
            localStorage.setItem('token', 'Bearer ' + auth.accessToken);
            localStorage.setItem('expiresIn', auth.expiresIn);
            localStorage.setItem('user', JSON.stringify(auth.userDetails));
            setLoading(false);
           window.location.href="/";
        } catch (error) {
            setAlert("Invalid credentials");
            setError(true);
            setLoading(false);
        }
    }

    const register = async (user) => {
        setLoading(true);
        try {
            await axiosApi({'method': 'POST', 'url': "api/public/register", data: user});
            setLoading(false);
            setAlert("Your account was created successfully");
            setSuccess(true);
            setToggleSignIn(true);
        } catch (err) {
            setLoading(false);
            setAlert("Failed to create account!Please try again later");
            setError(true);
        }

    }

    const resetAlert = (state) => {
        setAlert('');
        setSuccess(state);
        setError(state);
    }


    const checkIn = {error, success, alert, toggleSignIn, switchCheckIn, login, register, resetAlert, loading}
    return (
        <CheckInContext.Provider value={checkIn}>
            {props.children}
        </CheckInContext.Provider>
    );
}


export const useCheckInProps = () => {
    return React.useContext(CheckInContext);
}