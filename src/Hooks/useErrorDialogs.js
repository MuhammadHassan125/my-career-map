import { useContext } from 'react'
import ErrorDialogsContext from '../context/ErrorDialogsContext'

const useErrorDialogs = () => {
    const context = useContext(ErrorDialogsContext);
    if(!context) {
        throw new Error('useErrorDialogs must be used within a ErrorDialogsProvider')
    }
    return context
}

export default useErrorDialogs