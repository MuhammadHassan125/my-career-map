import React from 'react'
import './index.scss';
import UploadDataGrid from '../../Components/DashboardComponents/DataGrid/UploadDataGrid';


const Path = () => {
    return (
        <React.Fragment>
            <main className='path-section'>
                <h2>Listing Documents</h2>
                <UploadDataGrid  heading={"Uploaded Documents"} dropdown={"October"} />
            </main>
        </React.Fragment>
    )
}

export default Path