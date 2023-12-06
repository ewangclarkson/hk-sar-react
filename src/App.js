import React from "react";
import CheckIn from "./components/checkin/CheckIn";
import {CheckInProvider} from "./components/checkin/context/CheckInContext";
import Main from "./components/layouts/Main";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import ErrorComponent from "./components/alert/404";
import EditSector from "./components/sector/EditSector";
import AddSector from "./components/sector/AddSector";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<CheckInProvider><CheckIn/></CheckInProvider>}/>
                    <Route exact path="/home" element={<Main/>}>
                        <Route index element={<AddSector/>}/>
                    </Route>
                    <Route exact path="/edit" element={<Main/>}>
                        <Route exact index element={<EditSector/>}/>
                    </Route>
                    <Route exact path="*" element={<ErrorComponent/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
