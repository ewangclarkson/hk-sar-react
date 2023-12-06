import React from 'react';
import NavBar from "./NavBar";
import {CheckAuth} from "../checkin/context/CheckAuth";
import {Outlet} from  "react-router-dom"

const Main = () => {
    return (

        <main className="main">
            <CheckAuth>
                <NavBar/>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <Outlet/>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </div>
                    </div>
                </section>
            </CheckAuth>
        </main>
    );
};

export default Main;
