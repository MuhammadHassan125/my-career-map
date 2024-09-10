import React, { useState, useEffect } from 'react';
import './index.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination, Typography } from '@mui/material';
import { useUser } from '../../context/context';
import Fire from '../../Fire/Fire';
import Loading from '../../Components/Loading';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { AnalyzeURL } from '../../Fire/useFire';

const UploadDataGrid = ({ heading, dropdown }) => {
  const { data, getUploadDataList, setLoading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const generate_roadmap = (id, status) => {
    setLoading(true);
    Fire.post({
      url: `${AnalyzeURL}/${status === 'pending' ? "generate_roadmap" : "regenerate_roadmap"}?id=${id}`,

      onSuccess: (res) => {
        console.log(res);
        Snackbar(res?.data?.message, { variant: 'success' });
        getUploadDataList();
        setLoading(false);

      },
      onError: (err) => {
        console.log(err);
        setLoading(true);

      }
    })
  }

  const columns = [
    { Header: "Id", accessor: "id" },
    { Header: "Prompt", accessor: "prompt", 
        Cell: ({ value }) => (
          <Typography>
          {value ? (value.length > 40 ? `${value.substring(0, 40)}......` : value) : 'No Data'}
        </Typography>
  )
     },
    { Header: "File Path", accessor: "file" },
    {
      Header: "Status",
      accessor: "status",
   
      Cell: ({ value }) => (
        <Typography
          sx={{
            textTransform: 'capitalize',
            color: value === 'pending'
              ? 'warning.main'
              : value === 'analyzed'
                ? 'success.main'
                : 'info.main'
          }}
          style={{
            backgroundColor: value === 'pending' || value === 'analyzed' ? '#00B69B' : '#E8E8E8',
            border: 'none',
            outline: 'none',
            color: value === 'pending' || value === 'analyzed' ? 'white' : '#354E70',
            borderRadius: '10px',
            padding: '3px 10px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
       
        >
          {value}
        </Typography>
      )
    },
    { Header: "Skills", accessor: "total_skill_count" },
    {
      Header: "",
      accessor: "status",
      Cell: ({ value, row }) => (
        <button
          onClick={() => (value=== 'pending' || value === 'analyzed') && generate_roadmap(row.id, value)}
          style={{
            backgroundColor: value === 'pending' || value === 'analyzed' ? '#3749A6' : 'transparent',
            border: value === 'pending' || value === 'analyzed' ? '1px solid #3749A6' : '1px solid grey',
            outline: 'none',
            color: value === 'pending' || value === 'analyzed' ? 'white' : ' #354E70',
            borderRadius: '2.5px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {value === 'pending' ? 'Analyze' : value === 'analyzed' ? 'Reanalyze' : 'Analyzing'}
        </button>
      )
    },
  ];

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Loading/>
      <section className="data-grid">
        <div className='data-grid__heading'>
          <h3>{heading}</h3>
          <button>
            {dropdown}
            <MdKeyboardArrowDown />
          </button>
        </div>
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
      </section>
    </>
  );
};

export default UploadDataGrid;
