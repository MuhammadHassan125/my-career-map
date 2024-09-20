import React from 'react'
import ErrorDialogueContext from '../context/ErrorDialogueContext'
import UnAuthorizeModal from '../Components/UnAuthorizeModal'
import InternalServerErrorModal from '../Components/InternalServerErrorModal'

const ErrorDialogueProvider = ({children}) => {
  return (
    <ErrorDialogueContext.Provider>
        {children}
        <UnAuthorizeModal/>
        <InternalServerErrorModal/>
    </ErrorDialogueContext.Provider>
  )
}

export default ErrorDialogueProvider