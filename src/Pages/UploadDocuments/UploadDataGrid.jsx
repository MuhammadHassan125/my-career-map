import React from 'react';
import './index.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination, Typography } from '@mui/material';
import { useUser } from '../../context/context';
import Fire from '../../Fire/Fire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { AnalyzeURL } from '../../Fire/useFire';

const UploadDataGrid = ({ heading, dropdown }) => {
  const { data, getUploadDataList } = useUser();
  const generate_roadmap = (id, status) => {
    Fire.post({
      url: `${AnalyzeURL}/${status === 'pending' ? "generate_roadmap" : "regenerate_roadmap"}?id=${id}`,

      onSuccess: (res) => {
        console.log(res);
        Snackbar(res?.data?.message, { variant: 'success' });
        getUploadDataList();
      },
      onError: (err) => {
        console.log(err);
      }
    })
  }

  const columns = [
    { Header: "Id", accessor: "id" },
    { Header: "Prompt", accessor: "prompt" },
    { Header: "File Path", accessor: "file" },
    { Header: "Skills", accessor: "total_skill_count" },
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
        >
          {value}
        </Typography>
      )
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value, row }) => (
        <button
          onClick={() => (value=== 'pending' || value === 'analyzed') && generate_roadmap(row.id, value)}
          style={{
            backgroundColor: value === 'pending' || value === 'analyzed' ? '#00B69B' : 'grey',
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
          {value === 'pending' ? 'Analyze' : value === 'analyzed' ? 'Reanalyze' : 'Analyzing'}
        </button>
      )
    },
  ];

  return (
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
            {data.map((row, rowIndex) => (
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
      <Pagination count={2} sx={{ mt: 2 }} />
    </section>
  );
};

export default UploadDataGrid;
