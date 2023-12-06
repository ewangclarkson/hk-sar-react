import React, {useEffect, useState} from 'react';
import useFetch from "../checkin/config/useFetch";
import Loader from "../loader/Loader";
import Alert from "../alert/Alert";
import axiosApi from "../checkin/config/axios.client";
import {SectorLevel} from "../constants/sectorlevels.enum";
import Select from "react-select";

const DefaultSector = ({formData, isEdit, selectedSectors}) => {
    const result = useFetch({url: "api/public/sectors"});
    const [sectors, setSectors] = useState(formData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");

    const buildOptions = (rawData) => {
        const optios = [];
        rawData.map((sector) => {
            optios.push({
                value: (sector.id + '-' + SectorLevel.SECTOR_CATEGORY),
                label: sector.name,
                isDisabled: (sector.subSectors.length > 0)
            });
            sector.subSectors.map((subSector) => {
                optios.push({
                    value: (subSector.id + '-' + SectorLevel.SUB_SECTOR),
                    label: '\u00A0\u00A0\u00A0\u00A0' + subSector.name,
                    isDisabled: (subSector.minorSectors.length > 0)
                });
                subSector.minorSectors.map((minorSector) => {
                    optios.push({
                        value: (minorSector.id + '-' + SectorLevel.MINOR_SECTOR),
                        label: '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + minorSector.name,
                        isDisabled: (minorSector.sectors.length > 0)
                    });
                    minorSector.sectors.map((value) => {
                        optios.push({
                            value: (value.id + '-' + SectorLevel.SECTOR),
                            label: '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + value.name
                        });

                    })
                })
            })
        });
        return optios;
    }
    const buildSelectedOptions = (argOptions) => {
        return options.filter((selectedOptions) => {
            if (selectedSectors.includes(selectedOptions.value)) {
                return true;
            }
            return false;
        });
    }
    const options = buildOptions(result.data);
    const selectedOpts = buildSelectedOptions(options);
    //alert(JSON.stringify(selectedSectors));

    const getAuthUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = (name === "agreeTerms" ? (!sectors.agreeTerms) : e.target.value);
        setSectors({...sectors, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((sectors.name.length === 0 && sectors.sectors.length === 0 && !sectors.agreeTerms)) return;

        const user = getAuthUser();

        return (validateInput() ? (
                !isEdit ?
                    await createSector({
                        userId: user.id,
                        name: sectors.name,
                        sectors: sectors.sectors,
                        agreeTerms: sectors.agreeTerms
                    }) :
                    await updateSector(user.id, {
                        name: sectors.name,
                        sectors: sectors.sectors,
                        agreeTerms: sectors.agreeTerms
                    })) : (setMessage("All form fields are required"), setIsError(true))
        );
    }

    const setSelectedOptions = (transform) => {
        const sectorOptions = transform.map((option) => {
            const [id, depthType] = option.value.split("-");
            return {
                id: id,
                depthType: depthType
            }
        });
        setSectors({...sectors, sectors: sectorOptions});
    }

    const createSector = async (body) => {
        setIsLoading(true);
        try {
            await axiosApi({'method': 'POST', 'url': "api/protected/users/sectors", data: body});
            setIsLoading(false);
            window.location.reload();
        } catch (error) {
            setIsError(true);
            setMessage("An unexpected error occurs while adding your selected sector information")
            setIsLoading(false);
            setSectors(formData);
        }
    }

    const updateSector = async (userId, body) => {
        setIsLoading(true);
        try {
            await axiosApi({'method': 'PUT', 'url': `api/protected/users/${userId}/sectors`, data: body});
            setIsLoading(false);
            window.location.href = "/";
        } catch (error) {
            setIsError(true);
            setMessage("An unexpected error occurs while updating your sector information")
            setIsLoading(false);
            setSectors(formData);
        }
    }

    const validateInput = () => {
        return (sectors.name.length > 0 && sectors.sectors.length > 0 && sectors.agreeTerms);
    }

    if (result.loading || isLoading) {
        return <Loader className="page-loader"/>
    }

    return (
        <div>
            <h4 className="card-title">{isEdit ? "Edit Sector" : "Sector Registration"}</h4>
            <Alert className="alert alert-danger"
                   message={message}
                   show={isError} reset={setIsError}/>
            <form onSubmit={handleSubmit}>
                <div className="form-group form-group--left fm-input-width">
                    <label>Name</label>
                    <input type="text" className="form-control fm-input-width" name="name"
                           value={sectors.name}
                           onChange={handleChange}/>
                    <i className="form-group__bar fm-input-width"/>
                </div>
                {result.data.length > 0 ? <div>
                        <br/><br/>
                        <div className="form-group form-group--left fm-input-width">
                            <label>Sectors</label>
                            <Select
                                defaultValue={selectedOpts}
                                onChange={setSelectedOptions}
                                options={options}
                                isMulti
                                isSearchable
                                className="fm-input-width"
                            />
                        </div>
                    </div>
                    : ''
                }
                <br/><br/>
                <div className="mb-2">
                    <input type="checkbox" name="agreeTerms"
                           onChange={handleChange} value={sectors.agreeTerms}
                           checked={sectors.agreeTerms}/> Agree to terms
                </div>
                <br/><br/>
                <button type="submit" className="btn login__block__btn">{isEdit ? "Edit" : "Save"}</button>   {isEdit ?<a href="/" className="btn btn--icon bg-red login__block__btn"><i className="zmdi zmdi-arrow-left pt-13"  ></i></a>:''}
            </form>
        </div>
    );
};

export default DefaultSector;
