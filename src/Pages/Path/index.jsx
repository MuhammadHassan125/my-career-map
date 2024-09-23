import React from 'react'
import './index.scss';
import UploadDataGrid from '../UploadDocuments/UploadDataGrid';



const Path = () => {
    return (
        <React.Fragment>
            <main className='path-section'>
                <h2>List</h2>
                <UploadDataGrid  heading={"Path Details"} dropdown={"October"} />
            </main>
        </React.Fragment>
    )
}

export default Path