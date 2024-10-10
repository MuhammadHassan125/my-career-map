import React, { useEffect } from 'react';
import { IoCheckmarkSharp } from "react-icons/io5";
import './index.scss';
import { baseURL } from '../../Fire/useFire';
import Fire from '../../Fire/Fire';
import { useUser } from '../../context/context';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading';

const ListCareerPath = () => {
  const [selectedId, setSelectedId] = React.useState(null);
  const [listData, setListData] = React.useState([]);
  // const {loading} = useUser();
  const params = useParams();

  const handleSelect = (id) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      handleUpdateSkills(id);
    }
  };

  const handleSubmit = () => {
    Fire.get({
      url: `${baseURL}/get-skills-for-single-step/${params.id}`,
      onSuccess: (res) => {
        console.log('API Response:', res?.data?.data?.skills); 
        setListData(res?.data?.data?.skills || []);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const handleUpdateSkills = (id) => {
    Fire.get({
      url: `${baseURL}/check-status-of-skills/${id}`,
      onSuccess: (res) => {
        console.log(res, '')
        Snackbar(res?.data?.message, {variant: 'success'});
        if (res?.data?.status === "completed") {
          setSelectedId(id);
        } else {
          setSelectedId(null);
        }
        console.log('hassan')
        handleSubmit();
      },
      onError: (err) => {
        console.log(err)
        Snackbar(err.error, {variant: 'error'});
      }
    })
  };

  useEffect(() => {
    // if(!loading){
      handleSubmit();
    // }
  }, []);

  return (
    <React.Fragment>
      <Loading/>
    <main className='list-section'>
      <div>
        <h2><span>Sales Rep</span> Completed Skills</h2>
      </div>

      <div className='list-section__content'>
        {listData?.length > 0 ? (
            listData?.map((item) => {
              return (
                <div
                  key={item.id}  
                  className='list-section__content__div'
                  style={{ backgroundColor: selectedId === item.id || item.status === "completed" ? '#3749A6' : 'white' }}
                >
                  <div>
                    <button
                      onClick={() => handleSelect(item.id)}  
                      style={{
                        color: selectedId === item.id || item.status === "completed" ? 'white' : null,
                        borderColor: selectedId === item.id || item.status === "completed" ? 'white' : null,
                      }}
                    >
                      {selectedId === item.id || item.status === "completed" ? <IoCheckmarkSharp style={{ color: 'white' }} /> : null}
                    </button>
                    <p style={{ color: selectedId === item.id || item.status === "completed" ? 'white' : '#5B708B' }}>{item.title}</p>
                  </div>
    
                  <div
                    style={{
                      fontSize: '11px',
                      padding: '5px 8px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      color: item.status === "pending" ? 'white' : 'blue',
                      backgroundColor: item.status === "pending" ? '#00B69B' : '#f5f6fd'
                    }}
                  >
                    <p>{item.status}</p>
                  </div>
                </div>
              );
            })
        ) : (
          <p style={{ textAlign: 'center' }}>No Skills found</p>
        )}
      </div>
    </main>
    </React.Fragment>
  );
};

export default ListCareerPath;