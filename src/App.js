import React from "react";
import CheckIn from "./components/checkin/CheckIn";
import {CheckInProvider} from "./components/checkin/context/CheckInContext";
import Main from "./components/layouts/Main";


function App() {
    return (
        <>
            {/*<CheckInProvider>*/}
            {/*    <CheckIn/>*/}
            {/*</CheckInProvider>*/}
            <Main/>
        </>
    );
}

export default App;
