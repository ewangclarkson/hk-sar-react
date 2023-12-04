import React from 'react';

const Alert = ({className, message, show}) => {
    return (
        <>
            {show ?
                <div className={className} role="alert">
                    {message}
                </div> : ''
            }
        </>
    );
};

export default Alert;
