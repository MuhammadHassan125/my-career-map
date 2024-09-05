import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";
import { useUser } from "../../context/context";

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const {data} = useUser();

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
                const response = await axios.post(`${baseURL}/create-path`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                });
                Snackbar(`File upload complete! ID: ${response.data.message}`, {variant: 'success'});
                onUploadSuccess();
                setFile(null); 
                data();
            } catch (error) {
                Snackbar(`Error uploading file: ${error.error || error.message}`, {variant: 'error'});
            }
        }
    };

    useEffect(() => {
        if (file) {
            handleFileUpload();
        }
    }, [file]);

    return (
        <div className='file-upload__section'>
            <img src='/images/upload.png' alt='upload' />
            <label style={{border:'1px solid grey', borderRadius:'10px', padding:'5px 10px'}}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                />
                Upload Your File
            </label>
            {file && <p>{file.name}</p>} 
        </div>
    );
};

export default FileUpload;
