import React from 'react'
import './index.scss';
import UploadDataGrid from '../UploadDocuments/UploadDataGrid';

const columns = [
    { Header: "Id", accessor: "id" },
    { Header: "Prompt", accessor: "prompt" },
    { Header: "File Path", accessor: "file" },
    { Header: "Skills", accessor: "total_skill_count" },
  {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <button style={{
          backgroundColor: value === 'analyzed' ? '#00B69B' : 'grey',
          border: 'none',
          outline: 'none',
          color: 'white',
          borderRadius: '10px',
          padding: '3px 10px',
          cursor: 'pointer',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </button>
      )
    },  { Header: "", accessor: "Btn" },
  ];

const Path = () => {
    return (
        <React.Fragment>
            <main className='path-section'>
                <h2>All Path List</h2>
                <UploadDataGrid columns={columns} heading={"Path Details"} dropdown={"October"} />
            </main>
        </React.Fragment>
    )
}

export default Path