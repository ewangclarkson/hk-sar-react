import React, {useState} from "react";

const CheckInContext = React.createContext(null);

export const CheckInProvider = (props) => {

    const [isError, setIsError] = React.useState(false);
    const [alert,setAlert]=React.useState('');
    const [toggleSignIn, setToggleSignIn] = useState(true);

    const checkIn={isError,alert,toggleSignIn,setToggleSignIn}
    return (
        <CheckInContext.Provider value={checkIn}>
            {props.children}
        </CheckInContext.Provider>
    );
}


export const useCheckInProps = () => {
    return React.useContext(CheckInContext);
}