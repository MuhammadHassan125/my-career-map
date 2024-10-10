import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";
import { useUser } from "../../context/context";
import Loading from "../../Components/Loading";
import { useParams } from "react-router-dom";

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    // const {data, setLoading, getUploadDataList} = useUser();

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
                setLoading(true);
                const response = await axios.put(`${baseURL}/update-path/${params.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                });
                Snackbar(`File upload complete! ID: ${response.data.message}`, {variant: 'success'});
                onUploadSuccess();
                setFile(null); 
                // data();
                setLoading(false);
                getUploadDataList();
            } catch (error) {
                Snackbar(`Error uploading file: ${error.error || error.message}`, {variant: 'error'});
                setLoading(false);
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