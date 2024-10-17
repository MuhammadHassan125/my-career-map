import React, { useState, useEffect } from 'react';
import './index.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination, Typography } from '@mui/material';
import { useUser } from '../../context/context';
import Fire from '../../Fire/Fire';
import Loading from '../../Components/Loading';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { AnalyzeURL } from '../../Fire/useFire';
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload } from "react-icons/md";

const UploadDataGrid = ({ heading, dropdown }) => {
  const { data, getUploadDataList, setLoading, loading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [selectedRowData, setSelectedRowData] = useState(null); 
  const navigate = useNavigate(); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData); 
    navigate(`/path/${rowData.id}/edit`, {state:rowData}); 
  };

  const generate_roadmap = (id, status) => {
    setLoading(true);
    Fire.post({
      url: `${AnalyzeURL}/${status === 'pending' ? "generate_roadmap" : "regenerate_roadmap"}?id=${id}`,
      onSuccess: (res) => {
        Snackbar(res?.data?.message, { variant: 'success',  style: { backgroundColor:'var(--primary-btn-color)' } });
        setLoading(false);
        getUploadDataList();
      },
      onError: (err) => {
        setLoading(false);
      }
    });
  };


useEffect(() => {
  getUploadDataList();

  const pollInterval = setInterval(() => {
    getUploadDataList();
  }, 20000);

  return () => clearInterval(pollInterval);
}, []);

  const columns = [
    { Header: "Id", accessor: "id" },
    // {
    //   Header: "Prompt", accessor: "prompt",
    //   Cell: ({ value }) => (
    //     <Typography sx={{ fontSize: "13px" }}>
    //       {value ? (value.length > 40 ? `${value.substring(0, 40)}......` : value) : 'No Data'}
    //     </Typography>
    //   )
    // },
    {
      Header: "Title", accessor: "title",
      Cell: ({ value }) => (
        <Typography sx={{ fontSize: "13px" }}>
          {value ? (value.length > 40 ? `${value.substring(0, 40)}......` : value) : 'No Data'}
        </Typography>
      )
    },
    // { Header: "Path", accessor: "file" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <Typography
          sx={{
            textTransform: 'capitalize',
            backgroundColor: value === 'pending' || value === 'analyzed' ? 'rgb(241, 244, 246)' : '#E8E8E8',
            color: value === 'pending' || value === 'analyzed' ? '#879aad' : '#354E70',
            borderRadius: '10px',
            padding: '3px 0',
            textAlign:'center',
            cursor: 'pointer',
            fontSize: '11px',
             width:'70px',
            // height:'25px'
          }}
        >
          {value}
        </Typography>
      )
    },
    { Header: "Skills", accessor: "total_skill_count" },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ row }) => (
        <div
          style={{
            cursor: 'pointer', 
            background: '#E8E8E8', 
            padding: '6px', 
            borderRadius: "20px", 
            fontSize: "12px",
            textAlign:'center',
            width:'25px',
            height:'25px'
          }}
          onClick={() => handleEdit(row)}
        >
          <AiOutlineEdit  />
        </div>
      )
    },
    {
      Header: "",
      accessor: "status",
      Cell: ({ value, row }) => (
        <button
          onClick={() => (value === 'pending' || value === 'analysed') && generate_roadmap(row.id, value)}
          style={{
            backgroundColor: value === 'pending' || value === 'analysed' ? '#879aad' : 'transparent',
            border: value === 'pending' || value === 'analysed' ? '1px solid #879aad' : '1px solid grey',
            color: value === 'pending' || value === 'analysed' ? 'white' : '#354E70',
            borderRadius: '2.5px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '10px',
          }}
        >
          {value === 'pending' ? 'Analysed' : value === 'analysed' ? 'Reanalyze' : 'Analyzing'}
        </button>
      )
    },
  ];

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (!loading) {
      getUploadDataList();
    }
  }, [loading]);

  return (
    <>
      <Loading />
      <section className="data-grid">
        <div className='data-grid__heading'>
          <h3>{heading}</h3>
          <button>
            {dropdown}
            <MdKeyboardArrowDown />
          </button>
        </div>

        {/* Check if data is empty */}
        {data.length === 0 ? (
          <div className="no-data">
            <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>No data available</Typography>
          </div>
        ) : (
          <>
            <div className="data-grid__container">
              <table className="data-grid__table">
                <thead>
                  <tr className="data-grid__header-row">
                    {columns.map((col, index) => (
                      <th key={index} className="data-grid__header-cell">
                        {col.Header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, rowIndex) => (
                    <tr key={rowIndex} className="data-grid__body-row">
                      {columns.map((col, colIndex) => (
                        <td key={colIndex} className="data-grid__body-cell">
                          {col.Cell ? col.Cell({ value: row[col.accessor], row }) : (row[col.accessor] !== null ? row[col.accessor] : 'No Data')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 2 }}
            />
          </>
        )}
      </section>
    </>
  );
};

export default UploadDataGrid;
