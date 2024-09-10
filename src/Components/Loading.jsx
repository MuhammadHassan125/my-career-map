import React from 'react'
import { useUser } from '../context/context'
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {

    const { loading } = useUser();

    if (loading) {
        return (
        <Box 
        sx={{ 
            position: 'fixed',
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999, 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          }}>
            <CircularProgress />
        </Box>
        )
    } return null;
}

export default Loading