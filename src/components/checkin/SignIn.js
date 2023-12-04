import React from 'react';
import {useCheckInProps} from "./context/CheckInContext";


const SignIn = () => {
    const {isError, alert, toggleSignIn, setToggleSignIn} = useCheckInProps();

    return (
        <>
            {toggleSignIn && (
                <div className="login__block active" id="l-login">
                    <div className="login__block__header">
                        <i className="zmdi zmdi-account-circle"></i>
                        Hi there! Please Sign in

                    </div>

                    <div className="login__block__body">
                        <div className="form-group form-group--left">
                            <label>Email Address</label>
                            <input type="text" className="form-control"/>
                            <i className="form-group__bar"></i>
                        </div>

                        <div className="form-group form-group--left">
                            <label>Password</label>
                            <input type="password" className="form-control"/>
                            <i className="form-group__bar"></i>
                        </div>

                        <button href="index.html" className="btn btn--icon login__block__btn"><i
                            className="zmdi zmdi-long-arrow-right text-white"></i></button>
                        <br/><br/>

                        <a className="dropdown-item" href="#" onClick={() => setToggleSignIn(false)}>
                            <i className="zmdi zmdi-account-add text-green"></i> Create
                            an account</a>
                    </div>
                </div>)
            }
        </>
    );
};

export default SignIn;
