import React from 'react';
import "./checkin.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useCheckInProps} from "./context/CheckInContext";
import Alert from "../alert/Alert";
import {Navigate} from "react-router";

const CheckIn = () => {
    const checkIn = useCheckInProps();
    const isAuth = () => {
        if (localStorage.getItem('token') && (new Date(localStorage.getItem('expiresIn')) > new Date())) {
            return true;
        }else{
            localStorage.removeItem('token')
        }
        return false;
    }

    if (isAuth()) {
        return <Navigate to="/home"/>;
    }


    return (
        <>
            <div className="login">
                <Alert className="alert alert-danger check-in-alert-block" message={checkIn.alert}
                       show={checkIn.error} reset={checkIn.resetAlert}/><br/>
                <Alert className="alert alert-success check-in-alert-block" message={checkIn.alert}
                       show={checkIn.success} reset={checkIn.resetAlert}/><br/>

                <SignIn/>
                <SignUp/>
            </div>
        </>
    );
};

export default CheckIn;
