import React, {useState} from 'react';
import {useCheckInProps} from "./context/CheckInContext";
import Alert from "../alert/Alert";
import Loader from "../loader/Loader";

const SignUp = () => {
    const guest = {email: '', password: "", confirmPassword: ""};
    const [user, setUser] = useState(guest);
    const [error, setError] = useState(false);
    const checkIn = useCheckInProps();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email.length === 0 && user.password.length === 0 && user.confirmPassword.length === 0) {
            return;
        }
        if (validateInput(user)) {
            checkIn.register(user);
        } else {
            setError(true);
        }
        setUser(guest);
    }

    const validateInput = ({email, password, confirmPassword}) => {
        return (password === confirmPassword);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    }

    return (
        <>
            <Alert className="alert alert-danger check-in-alert-block"
                   message="All fields are required,password and confirm password fields must be thesame"
                   show={error} reset={checkIn.resetAlert}/><br/>
            {!checkIn.toggleSignIn && (
                <div className="login__block active" id="l-register">
                    <div className="login__block__header">
                        <i className="zmdi zmdi-account-circle"></i>
                        Create an account

                    </div>

                    <div className="login__block__body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group form-group--left">
                                <label>Email Address</label>
                                <input type="email" className="form-control" value={user.email} name="email"
                                       onChange={handleChange}/>
                                <i className="form-group__bar"></i>
                            </div>

                            <div className="form-group form-group--left">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" value={user.password}
                                       onChange={handleChange}/>
                                <i className="form-group__bar"></i>
                            </div>

                            <div className="form-group form-group--left">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword"
                                       value={user.confirmPassword} onChange={handleChange}/>
                                <i className="form-group__bar"></i>
                            </div>
                            {checkIn.loading ? <Loader className="center"/> : ''}
                            <button type="submit" className="btn btn--icon login__block__btn" disabled={checkIn.loading}><i
                                className="zmdi zmdi-check-all text-white"></i></button>
                        </form>
                        <br/><br/>

                        <a className="dropdown-item" onClick={() => checkIn.switchCheckIn(true)}>
                            <i className="zmdi zmdi-long-arrow-right text-green"></i>Already have an account?</a>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default SignUp;
