import React, {useState} from 'react';
import "./checkin.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useCheckInProps} from "./context/CheckInContext";
import Alert from "../Alert";

const CheckIn = () => {
    const error = useCheckInProps();
    return (
        <>
            <div className="login">
                <Alert className="alert alert-danger check-in-alert-block" message={error.alert}
                       show={error.isError}/><br/>

                <SignIn/>
                <SignUp/>
            </div>
        </>
    );
};

export default CheckIn;
