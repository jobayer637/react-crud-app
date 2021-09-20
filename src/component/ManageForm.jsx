import React from 'react'
import {
    Button, Form, Row, Col
} from 'react-bootstrap'
import ManageInput from './ManageInput'

const ManageForm = ({ newEmp, handleInput, handleForm }) => {
    return (
        <div>
            <Form onSubmit={handleForm}>
                <Row className="align-items-center">
                    <Col md="4">
                        <ManageInput
                            label={'Name'}
                            handleInput={handleInput}
                            type={'text'}
                            name={'name'}
                            value={newEmp.name}
                            placeholder={'Enter Employee Name'}
                        />
                    </Col>
                    <Col md="3">
                        <ManageInput
                            label={'Salary'}
                            handleInput={handleInput}
                            type={'text'}
                            name={'salary'}
                            value={newEmp.salary}
                            placeholder={'Enter Employee Salary'}
                        />
                    </Col>
                    <Col xs="auto">
                        <ManageInput
                            label={'Age'}
                            handleInput={handleInput}
                            type={'text'}
                            name={'age'}
                            value={newEmp.age}
                            placeholder={'Enter Employee Age'}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ManageForm
