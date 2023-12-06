import React from 'react';
import "./404.css";

const ErrorComponent = () => {

    const isAuth = () => {
        let accessToken = localStorage.getItem('token');
        if (accessToken && (new Date(localStorage.getItem('expiresIn')) > new Date())) {
            return true;
        }
        return false;
    }

    return (
        <section className="error">
            <div className="error__inner">
                <h1>404</h1>
                <h2>The page you are looking for doesn't exist!</h2>
                <p>
                    <a href={isAuth() ? "/home" : "/"}>Back To Home</a>
                </p>
            </div>
        </section>
    );
};

export default ErrorComponent;
