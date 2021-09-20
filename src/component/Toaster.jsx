import React from 'react'
import {
  Toast, ToastContainer
} from 'react-bootstrap'


const Toaster = ({type, message, handleToaster, show}) => {
  return (
    <div>
      <ToastContainer style={{ zIndex: '100' }} position="top-end" className="p-3">
        <Toast 
        show={show} 
        onClose={handleToaster} 
        className="border border-success text-white" 
        style={{ backgroundColor: 'rgb(100,50,40,.9)' }}>
          <Toast.Header className="bg-success text-white">
            <strong className="me-auto">{type}!!</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{message} !</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}


export default Toaster