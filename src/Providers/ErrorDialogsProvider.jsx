import React, { useMemo } from 'react'
import ErrorDialogsContext from '../context/ErrorDialogsContext'
import UnAuthorizeModal from '../Components/UnAuthorizeModal'
import InternalServerErrorModal from '../Components/InternalServerErrorModal'

const ErrorDialogsProvider = ({children}) => {

  const [openUnAuthorizeModal, setOpenUnAuthorizeModal] = React.useState(false);
  const [openInternalServer, setOpenInternalServer] = React.useState(false);
  

  const handleOpenUnAuthorizeModal = () => setOpenUnAuthorizeModal(true);
  const handleCloseUnAuthorizeModal = () => setOpenUnAuthorizeModal(false);
  const handleOpenInternalServer = () => setOpenInternalServer(true);
  const handleCloseInternalServer = () => setOpenInternalServer(false);

  const ContextValues = useMemo(() => ({
    openUnAuthorizeModal,
    openInternalServer,
    handleOpenUnAuthorizeModal,
    handleCloseUnAuthorizeModal,
    handleOpenInternalServer,
    handleCloseInternalServer,
  }), [openUnAuthorizeModal, openInternalServer]);

  return (
    <ErrorDialogsContext.Provider value={ContextValues}>
        {children}
        <UnAuthorizeModal open={openUnAuthorizeModal} handleClose={handleCloseUnAuthorizeModal} />
        <InternalServerErrorModal open={openInternalServer} handleClose={handleCloseInternalServer}/>
    </ErrorDialogsContext.Provider>
  )
}

export default ErrorDialogsProvider