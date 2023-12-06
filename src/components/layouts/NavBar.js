import React from 'react';
import logo from "../assets/flag.png";

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('user');
        window.location.href = "/";
    };
    return (
        <header className="header">
            <div className="header__logo hidden-sm-down">
                <h1><a href="/home">HK SAR TEST</a></h1>
            </div>

            <form className="search">
                <div className="search__inner">
                    <input type="text" className="search__text"
                           placeholder=""/>
                </div>
            </form>
            <div className="user">
                <div className="user__info">
                    <img className="user__img" src={logo} alt=""/>
                    <div>
                        <div className="user__email">{user.email}<br/>
                            <a className="text-white" href="#" onClick={logout}>Logout</a></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
