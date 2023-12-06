import React, {useState} from 'react';
import {useCheckInProps} from "./context/CheckInContext";
import Loader from "../loader/Loader";


const SignIn = () => {

    const guest = {email: '', password: ""};
    const [user, setUser] = useState(guest);
    const checkIn = useCheckInProps();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInput(user)) {
            checkIn.login(user)
        }
        setUser(guest);
    }

    const validateInput = ({email, password}) => {
        return (email.length > 0 && password.length > 0);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    }

    return (
        <>
            {checkIn.toggleSignIn && (
                <div className="login__block active" id="l-login">
                    <div className="login__block__header">
                        <i className="zmdi zmdi-account-circle"/>
                        Hi there! Please Sign in

                    </div>
                    <div className="login__block__body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group form-group--left">
                                <label>Email Address</label>
                                <input type="email" className="form-control" value={user.email} name="email"
                                       onChange={handleChange}/>
                                <i className="form-group__bar"/>
                            </div>

                            <div className="form-group form-group--left">
                                <label>Password</label>
                                <input type="password" className="form-control" value={user.password} name="password"
                                       onChange={handleChange}/>
                                <i className="form-group__bar"/>
                            </div>
                            {checkIn.loading ? <Loader className="center"/> : ''}
                            <button type="submit" className="btn btn--icon login__block__btn" disabled={checkIn.loading}><i
                                className="zmdi zmdi-long-arrow-right text-white"/></button>
                        </form>
                        <br/><br/>

                        <a className="dropdown-item" onClick={() => checkIn.switchCheckIn(false)}>
                            <i className="zmdi zmdi-account-add text-green"/> Create
                            an account</a>
                    </div>
                </div>)
            }

        </>
    );
};

export default SignIn;
