import React, { Component } from 'react'
import { demoEmployee } from './Employee'
import ManageForm from './ManageForm'
import {
    Table, Button, ButtonGroup, Card, Modal
} from 'react-bootstrap'
import Toaster from './Toaster'

export class Crud extends Component {
    state = {
        employee: [],
        newEmp: {
            id: '' , name: '', salary: '', age: ''
        },
        addEmpModal: {
            show: false
        },
        success: true,
        toaster: {
            show: false
        }
    }

    componentDidMount = () => {
        this.setState({
            employee: demoEmployee
        })
    }

    handleModal = () => {
        this.setState({
            addEmpModal: {
                show: !this.state.addEmpModal.show
            }
        })
    }

    handleInput = (event) => {
        this.setState({
            newEmp: {...this.state.newEmp, [event.target.name]: event.target.value}
        })
    }

    handleForm = (event) => {
        event.preventDefault()
        this.state.newEmp.id=this.state.employee.length + 1

        this.setState({
            employee: [...this.state.employee, this.state.newEmp],
            toaster: {show: true},
            addEmpModal: {show: false},
            newEmp: {id: '', name: '', salary: '', age: ''}
        }, () => {
            setTimeout( () => {
                this.setState({
                    toaster: {show: false}
                })
            },4000)
        })
    }

    handleDelete = (id) => {
        var result = window.confirm("Delete the item?")
        if (result) {
            this.setState({
                employee: this.state.employee.filter(emp => emp.id != id)
            })
        } 
    }

    handleToaster = () => {
        this.setState({
            toaster: {show: false}
        })
    }

    render() {
        return (
            <div>
                {this.state.success
                ? <Toaster 
                    show={this.state.toaster.show}
                    type={'Success'}
                    message={'New Employee SuccessFully Added'}
                    handleToaster={this.handleToaster}
                />
                : ''}
                <Card>
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3>All Employees</h3>
                            </div>
                            <div>
                                <Button onClick={this.handleModal} className="rounded-0 btn-secondary">Add New Employee</Button>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Salary</th>
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employee.map(emp =>
                                    <tr  key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.salary}</td>
                                        <td>{emp.age}</td>
                                        <td>
                                            <ButtonGroup className="">
                                                <Button variant="warning">Edit</Button>
                                                <Button onClick={() => this.handleDelete(emp.id)} variant="danger">Delete</Button>
                                            </ButtonGroup>
                                            <br />
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Add New employee Modal */}
                <Modal show={this.state.addEmpModal.show} fullscreen={true} onHide={() => this.handleModal()}>
                    <div className="container py-5">
                        <Card className="border border-info">
                            <Modal.Header closeButton className="bg-info">
                                <Modal.Title>Add New Employee Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ManageForm 
                                    newEmp={this.state.newEmp}
                                    handleForm={this.handleForm}
                                    handleInput={this.handleInput}
                                />
                            </Modal.Body>
                        </Card>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Crud
