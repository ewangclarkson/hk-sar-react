import React from 'react';
import useFetch from "../checkin/config/useFetch";
import Loader from "../loader/Loader";
import DefaultSector from "./DefaultSector";

const EditSector = () => {

    const {loading, error, data} = useFetch({url: "api/protected/users/sectors/me"});

    if (loading) {
        return <Loader className="page-loader"/>
    }
    return (
        <>
            <DefaultSector
                formData={{name: data[0].name, sectors: [], agreeTerms: data[0].agreeTerms}}
                isEdit={true}
                selectedSectors={data[0].sectors.map((transform) =>(transform.id +'-'+transform.depthType))}
            />
        </>
    );
};

export default EditSector;
