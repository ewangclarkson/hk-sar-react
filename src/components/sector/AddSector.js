import React from 'react';
import useFetch from "../checkin/config/useFetch";
import SectorList from "./SectorList";
import Loader from "../loader/Loader";
import DefaultSector from "./DefaultSector";

const AddSector = () => {
    const emptyData = {name: '', sectors: [], agreeTerms: false};
    const {loading, error, data} = useFetch({url: "api/protected/users/sectors/me"});

    if (loading) {
        return <Loader className="page-loader"/>
    }

    return (
        <>
            {
                (error || data[0].sectors.length > 0)
                    ? <SectorList  {...data[0]}/> :
                    <DefaultSector
                        formData={emptyData}
                        isEdit={false}
                        selectedSectors={[]}
                    />
            }
        </>
    );
};


export default AddSector;
