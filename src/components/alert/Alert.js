import React from 'react';
import "./Alert.css"

const Alert = ({className, message, show,reset}) => {
    return (
        <>
            {show ?
                <div className={className} role="alert">
                    {message}
                    <button type="button" className="close" onClick={() =>reset(false)}>
                        <span aria-hidden="true" className="text-white">&times;</span>
                    </button>
                </div> : ''
            }
        </>
    );
};

export default Alert;
