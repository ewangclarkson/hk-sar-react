import React from 'react';
import SectorOperation from "./SectorOperation";
import logo from "../assets/flag.png";

const Sector = () => {
    const getUsername = () =>{
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));;
        return (userDetails ==null ?'':userDetails.name);
    }
    return (
        <>
            <main className="main">
                <header className="header">
                    <div className="header__logo hidden-sm-down">
                        <h1><a href="/">HK SAR TEST</a></h1>
                    </div>
                    <form className="search">
                        <div className="search__inner">
                            <input type="text" className="search__text"
                                   placeholder=""/>
                        </div>
                    </form>
                    {sessionStorage.getItem("userDetails") !== null ?
                        <div className="user">
                            <div className="user__info">
                                <img className="user__img" src={logo} alt=""/>
                                <div>
                                    <div className="user__email">{getUsername()}<br/>
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                    }
                </header>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <SectorOperation
                                isEdit={sessionStorage.getItem("userDetails")!==null}
                            /><br/>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};


export default Sector;
