import React from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";
import './index.scss';

const ListCareerPath = () => {

  const [selectedId, setSelectedId] = React.useState(null);

  const handleSelect = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const data = [
    { id: 1, name: "Course title or details" },
    { id: 2, name: "Course title or details" },
    { id: 3, name: "Course title or details" },
    { id: 4, name: "Course title or details" },
    { id: 5, name: "Course title or details" }
  ];

  return (
    <React.Fragment>
      <main className='list-section'>
        <div>
          <h2><span>Sales Rep</span> Completed Skills</h2>
        </div>

        <div className='list-section__content'>
          {data.map((item) => (
            <div
              key={item.id}
              className='list-section__content__div'
              style={{ backgroundColor: selectedId === item.id ? '#3749A6' : 'white' }}
            >
              <div>
                <button
                  onClick={() => handleSelect(item.id)}
                  style={{
                    color: selectedId === item.id ? '1px solid white' : null,
                    borderColor: selectedId === item.id ? 'white' : null,
                  }}
                >
                  {selectedId === item.id ? <IoCheckmarkSharp style={{ color: 'white' }} /> : null}
                </button>
                <p style={{ color: selectedId === item.id ? 'white' : '#5B708B' }}>{item.name}</p>
              </div>

              <div
                style={{
                  color: selectedId === item.id ? 'white' : null,
                  backgroundColor: selectedId === item.id ? '#6C99FF' : null,
                  padding: '8px',
                  borderRadius: '5px',
                  fontSize: '18px',
                }}
              >
                <IoEyeOutline style={{ color: selectedId === item.id ? null : '#5B708B' }}/>
              </div>
            </div>
          ))}
        </div>
      </main>
    </React.Fragment>
  );
}

export default ListCareerPath;
