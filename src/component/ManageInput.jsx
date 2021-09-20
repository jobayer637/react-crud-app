import React from 'react'
import {
    Form
} from 'react-bootstrap'


const ManageInput = ({label, handleInput, type, name, value, placeholder}) => {
    return (
        <div>
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                {label}
            </Form.Label>
            <Form.Control
                onChange={handleInput}
                type={type}
                name={name}
                value={value}
                className="mb-2"
                id="inlineFormInput"
                placeholder={placeholder}
            />
        </div>
    )
}

export default ManageInput
