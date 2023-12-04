import React from 'react';
import logo from '../assets/deafult-user.jpg'
import NavBar from "./NavBar";

const Main = () => {
    return (

        <main className="main">
            <NavBar/>
            <section className="content">
                <header className="content__title">
                    <h1>Colors</h1>
                    <small>Convey meaning through color with a handful of color utility classes. Includes support for
                        styling links with hover states, too.</small>
                </header>

                <div className="card">
                    <div className="card-body">
                        <p>All these colors are available in LESS variable. You include this with any class/ID as
                            mentioned below.</p>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;
