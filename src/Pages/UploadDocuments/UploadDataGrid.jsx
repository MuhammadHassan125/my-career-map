import React from 'react';
import './index.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination } from '@mui/material';
import { useUser } from '../../context/context';

const UploadDataGrid = ({ columns, heading, dropdown }) => {
  const { data } = useUser(); 

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
                    {col.Cell ? col.Cell({ value: row[col.accessor] }) : (row[col.accessor] !== null ? row[col.accessor] : 'No Data')}
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
