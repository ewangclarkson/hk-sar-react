import React from 'react';
import "./SectorList.css";

const SectorList = ({userId, name, sectors, agreeTerms}) => {
    return (
        <div>
            <h4 className="card-title">User Sectors</h4>
            <h6 className="card-subtitle">Already existing sector</h6>
            <table className="table table-responsive">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Sectors</th>
                    <th>Has Agreed To Terms</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{name}</td>
                    <td>
                        <ul>
                            {
                                sectors.map((sector) => (
                                    <li key={sector.id}>{sector.sectorName}</li>
                                ))
                            }
                        </ul>
                    </td>
                    <td>{agreeTerms ? "Yes" : "No"}</td>
                    <td>
                        <a href="/edit" className="btn btn--icon login__block__btn pt-13">
                            <i className="zmdi zmdi-edit text-white"/></a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SectorList;
