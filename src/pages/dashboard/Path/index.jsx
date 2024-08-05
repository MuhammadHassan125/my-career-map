import React from 'react'
import './index.scss';
import DataGrid from '../../../components/DashboardComponents/DataGrid/DataGrid';

const columns = [
    { Header: "Path", accessor: "Path" },
    { Header: "Step", accessor: "Step" },
    { Header: "Date - Time", accessor: "Date" },
    { Header: "Points", accessor: "Points" },
    { Header: "Session Duration", accessor: "Session" },
    { Header: "Status", accessor: "Status" },
];

const data = [
    {
        id: 1,
        Path: "Sales Rep",
        Step: "Senior Sales Rep",
        Date: "12.09.2019 - 12.53 PM",
        Points: "423",
        Session: "36 hours",
        Status: (
            <button style={{
                backgroundColor: '#00B69B', border: 'none', outline: 'none',
                color: 'white', borderRadius: '10px', padding: '3px 10px', cursor: "pointer"
            }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
                Active User
            </button>
        ),
    },
    {
        id: 2,
        Path: "Sales Rep",
        Step: "Sales Executive",
        Date: "12.09.2019 - 12.53 PM",
        Points: "423",
        Session: "42 hours",
        Status: (

            <button style={{
                backgroundColor: '#FCBE2D', border: 'none', outline: 'none',
                color: 'white', borderRadius: '10px', padding: '3px 10px', cursor: "pointer"
            }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
                Possible Path
            </button>),
    },
    {
        id: 1,
        Path: "Sales Rep",
        Step: "Sales Executive",
        Date: "12.09.2019 - 12.53 PM",
        Points: "423",
        Session: "16 hours",
        Status: (
            <button style={{
                backgroundColor: '#FD5454', border: 'none', outline: 'none',
                color: 'white', borderRadius: '10px', padding: '3px 10px', cursor: "pointer"
            }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
                Different Career
            </button>
        ),
    },
];

const Path = () => {
  return (
    <React.Fragment>
            <main className='path-section'>
                <h2>List</h2>
                <DataGrid columns={columns} data={data} heading={"Path Details"} dropdown={"October"}/>
            </main>
    </React.Fragment>  
    )
}

export default Path