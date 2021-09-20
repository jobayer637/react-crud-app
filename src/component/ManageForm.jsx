import React from 'react'
import {
    Button, Form, Row, Col
} from 'react-bootstrap'

const ManageForm = ({newEmp, handleInput, handleForm}) => {
    return (
        <div>
            <Form onSubmit={handleForm}>
                <Row className="align-items-center">
                    <Col md="4">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control
                            onChange={handleInput}
                            type="text"
                            name="name"
                            value={newEmp.name}
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Enter Name"
                        />
                    </Col>
                    <Col md="3">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control
                            onChange={handleInput}
                            type="text"
                            name="salary"
                            value={newEmp.salary}
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Enter Salary"
                        />
                    </Col>
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control
                            onChange={handleInput}
                            type="text"
                            name="age"
                            value={newEmp.age}
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Enter Age"
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
