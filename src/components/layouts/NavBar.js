import React from 'react';
import logo from "../assets/deafult-user.jpg";

const NavBar = () => {
    return (
        <header className="header">
            <div className="header__logo hidden-sm-down">
                <h1><a href="">HK SAR TEST</a></h1>
            </div>

            <form className="search">
                <div className="search__inner">
                    <input type="text" className="search__text"
                           placeholder="Search for people, files, documents..."/>
                </div>
            </form>
            <div className="user">
                <div className="user__info">
                    <img className="user__img" src={logo} alt=""/>
                    <div>
                        <div className="user__email">hk-sar@gmail.com<br/>
                            <a className="text-white" href="">Logout</a></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
