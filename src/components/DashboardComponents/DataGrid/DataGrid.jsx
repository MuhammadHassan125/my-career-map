import React from 'react';
import './index.scss'; 
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination } from '@mui/material';

const DataGrid = ({ columns, data, heading, dropdown }) => {
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
              {columns.map((col) => (
                <th key={col.accessor || col.Header} className="data-grid__header-cell">
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="data-grid__body-row">
                {columns.map((col) => (
                  <td key={col.accessor || col.Header} className="data-grid__body-cell">
                    {col.accessor ? row[col.accessor] : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination count={2} sx={{mt:2}}/>

    </section>
  );
};

export default DataGrid;
