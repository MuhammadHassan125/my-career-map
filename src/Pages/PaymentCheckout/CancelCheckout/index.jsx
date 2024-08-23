import React from 'react'

const CancelCheckout = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <img src='/images/cancel.webp' alt='cancel' style={{width:"120px", height:"120px"}}/>
        <h2 style={{fontSize:"35px"}}>Payment Canceled</h2>
        <p style={{color:"#f50000"}}>Your payment has been canceled.</p>
    </div>
  )
}

export default CancelCheckout