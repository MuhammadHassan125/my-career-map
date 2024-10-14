import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../Fire/useFire";
import Loading from "../../Components/Loading";
import { useParams } from "react-router-dom";

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const params = useParams();
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const token = localStorage.getItem('user-visited-dashboard');
        if (!file) return alert('Please select a file');
        if (!token) return alert('Please upload a token');

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.put(`${baseURL}/update-path/${params.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                });
                onUploadSuccess();
                setFile(null); 
                getUploadDataList();
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (file) {
            handleFileUpload();
        }
    }, [file]);

    return (
        <>
        <Loading/>
        <div className='file-upload__section'>
            <img src='/images/upload.png' alt='upload' />
            <label style={{padding:'5px 10px', borderBottom: '1px solid #3749A6', cursor:'pointer', color:'#3749A6'}}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                />
                Click here to Browse.
            </label>
            {file && <p>{file.name}</p>} 
        </div>
        </>

    );
};

export default FileUpload;