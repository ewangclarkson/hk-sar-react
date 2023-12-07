import React, {useState} from 'react';
import useFetch from "../providers/useFetch";
import Loader from "../loader/Loader";
import Alert from "../alert/Alert";
import axiosApi from "../providers/axios.client";
import {SectorLevel} from "../constants/sectorlevels.enum";
import Select from "react-select";

const SectorOperation = ({isEdit}) => {
    const result = useFetch({url: "api/public/sectors"});
    const getFormData = () => {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        return {
            name: userDetails == null ? '' : userDetails.name,
            sectors: userDetails == null ? [] : userDetails.sectors,
            agreeTerms: userDetails == null ? false : userDetails.agreeTerms,
        };
    }

    const [sectors, setSectors] = useState(getFormData());
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    //Build the user selected options and default options

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

    const getTransformedSectors = () => {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        return (userDetails == null ? [] : userDetails.sectors.map((transform) => (transform.id + '-' + transform.depthType)))
    }
    const buildSelectedOptions = (argOptions) => {
        const selectedSectors = getTransformedSectors();
        return argOptions.filter((selectedOptions) => {
            if (selectedSectors.includes(selectedOptions.value)) {
                return true;
            }
            return false;
        });
    }
    const options = buildOptions(result.data);
    const selectedOpts = buildSelectedOptions(options);

    const getSessionUser = () => {
        return JSON.parse(sessionStorage.getItem('userDetails'));
    }

    //End of selected /options building

    //handle controlled inputs
    const handleChange = (e) => {
        const name = e.target.name;
        const value = (name === "agreeTerms" ? (!sectors.agreeTerms) : e.target.value);
        setSectors({...sectors, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((sectors.name.length === 0 && sectors.sectors.length === 0 && !sectors.agreeTerms)) return;

        const user = getSessionUser();

        return (validateInput() ? (
                !isEdit ?
                    await createSector({
                        name: sectors.name.trim(),
                        sectors: sectors.sectors,
                        agreeTerms: sectors.agreeTerms
                    }) :
                    await updateSector(user.userId, {
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

    //end

    //call backend services
    const createSector = async (body) => {
        setIsLoading(true);
        try {
            const response = await axiosApi({
                'method': 'POST',
                'url': "api/public/users/sectors",
                data: body
            });
            const data = await response.data;
            sessionStorage.setItem("userDetails", JSON.stringify(data));
            setIsLoading(false)
            setMessage("Your sector registration was successful");
            setSuccess(true);
        } catch (error) {
            setIsError(true);
            setMessage("An unexpected error occurs while adding your selected sector information")
            setIsLoading(false);
        }
    }

    const updateSector = async (userId, body) => {
        setIsLoading(true);
        try {
            const response = await axiosApi({
                'method': 'PUT',
                'url': `api/public/users/${userId}/sectors`,
                data: body
            });
            const data = await response.data;
            sessionStorage.removeItem("userDetails");
            sessionStorage.setItem("userDetails", JSON.stringify(data));
            setIsLoading(false);
            setMessage("Your sector registration update was successful");
            setSuccess(true);
        } catch (error) {
            setIsError(true);
            setMessage("An unexpected error occurs while updating your sector information")
            setIsLoading(false);
        }
    }
    //end

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
            <Alert className="alert alert-success"
                   message={message}
                   show={success} reset={setSuccess}/>
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
                <br/>
                {isLoading ? <Loader className="center"/> : ''}
                <br/>
                <button type="submit" className="btn login__block__btn text-white">{isEdit ? "Edit" : "Save"}</button>
            </form>
        </div>
    );
};

export default SectorOperation;
