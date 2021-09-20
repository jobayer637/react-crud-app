import React, { Component } from 'react'
import { demoEmployee } from './Employee'
import ManageForm from './ManageForm'
import {
    Table, Button, ButtonGroup, Card, Modal, Row, Col
} from 'react-bootstrap'
import Toaster from './Toaster'

export class Crud extends Component {
    state = {
        employee: [],
        newEmp: {
            id: '', name: '', salary: '', age: ''
        },
        editEmp: {
            id: '', name: '', salary: '', age: ''
        },
        addEmpModal: {
            show: false
        },
        success: true,
        toaster: {
            show: false,
            type: '',
            message: ''
        },
        isUpdate: false,
        randomColor: {
            r: '10', g: '100', b: '200'
        },
        randomBorder: '',
        search: ''

    }

    componentDidMount = () => {
        this.setState({
            employee: demoEmployee
        })

        setInterval(() => {
            let r = Math.floor(Math.random() * 255) + 1;
            let g = Math.floor(Math.random() * 255) + 1;
            let b = Math.floor(Math.random() * 255) + 1;

            const br = ['dotted', 'dashed', 'solid', 'dotted', 'dotted', 'dashed', 'solid', 'dashed', 'solid']
            let brdr = Math.floor(Math.random() * 9) + 1;
            this.setState({
                randomColor: { r, g, b },
                randomBorder: br[brdr]
            })
        }, 4 * 1000)
    }

    handleInput = (event) => {
        if (this.state.isUpdate) {
            this.setState({
                editEmp: { ...this.state.editEmp, [event.target.name]: event.target.value }
            })
        } else {
            this.setState({
                newEmp: { ...this.state.newEmp, [event.target.name]: event.target.value }
            })
        }
    }

    handleForm = (event) => {
        event.preventDefault()
        this.state.newEmp.id = this.state.employee.length + 1

        if (this.state.isUpdate) {
            const { id, name, salary, age } = this.state.editEmp
            let employee = this.state.employee
            let findEmp = employee.find(emp => emp.id === id)
            findEmp.name = name
            findEmp.salary = salary
            findEmp.age = age

            this.setState({
                isUpdate: false,
                employee,
                toaster: {
                    show: true,
                    type: 'Success',
                    message: 'Successfully Updated'
                },
                addEmpModal: { show: false },
                newEmp: { id: '', name: '', salary: '', age: '' },
                editEmp: { id: '', name: '', salary: '', age: '' }
            }, () => {
                setTimeout(() => {
                    this.setState({
                        toaster: { show: false }
                    })
                }, 4000)
            })
        } else {
            this.setState({
                employee: [...this.state.employee, this.state.newEmp],
                toaster: {
                    show: true,
                    type: 'Success',
                    message: 'New Employee Successfully Added'
                },
                addEmpModal: { show: false },
                newEmp: { id: '', name: '', salary: '', age: '' }
            }, () => {
                setTimeout(() => {
                    this.setState({
                        toaster: { show: false }
                    })
                }, 4000)
            })
        }

    }

    handleDelete = (id) => {
        var result = window.confirm("Delete the item?")
        if (result) {
            this.setState({
                employee: this.state.employee.filter(emp => emp.id != id)
            })
        }
    }

    handleModal = () => {
        this.setState({
            isUpdate: false,
            editEmp: { id: '', name: '', salary: '', age: '' },
            addEmpModal: {
                show: !this.state.addEmpModal.show
            }
        })
    }

    handleEdit = (id) => {
        const find = this.state.employee.find(emp => emp.id === id)
        this.setState({
            editEmp: find,
            isUpdate: true,
            addEmpModal: {
                show: !this.state.addEmpModal.show
            }
        })
    }

    handleToaster = () => {
        this.setState({
            toaster: { show: false }
        })
    }

    handleSearch = (event) => {
        this.setState({search: event.target.value})
    }

    render() {
        const { r, g, b } = this.state.randomColor
        return (
            <div>
                <div className="card my-2" style={{ backgroundColor: `rgb(${r},${b},${g},0.3)`, border: `2px ${this.state.randomBorder} rgb(${g},${r},${b},1)` }}>
                    <div className="card-header"><h1>React CRUD Applicatioin</h1></div>
                </div>
                {this.state.success
                    ? <Toaster
                        show={this.state.toaster.show}
                        type={this.state.toaster.type}
                        message={this.state.toaster.message}
                        handleToaster={this.handleToaster}
                    />
                    : ''}
                <Card style={{ backgroundColor: `rgb(${r},${g},${b},0.3)`, border: `2px ${this.state.randomBorder} rgb(${b},${r},${g},1)` }}>
                    <Card.Header>
                        <Row>
                            <Col md="5">
                                <h3>All Employees</h3>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <input onChange={this.handleSearch} type="text" className="form-control" placeholder="Search Employee"/>
                                    </Col>
                                    <Col>
                                        <Button onClick={this.handleModal} className="rounded-0 btn-warning"><i class="fas fa-plus-circle"></i> Add New Employee</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
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

                                {this.state.employee.filter(emp => {
                                    if(this.state.search === '' || this.state.search === null)
                                        return emp
                                    if(emp.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                                        emp.id.toString().includes(this.state.search) ||
                                        emp.age.includes(this.state.search) || 
                                        emp.salary.includes(this.state.search))
                                        return emp
                                }).map(emp =>
                                    <tr key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.salary}</td>
                                        <td>{emp.age}</td>
                                        <td>
                                            <ButtonGroup className="">
                                                <Button onClick={() => this.handleEdit(emp.id)} variant="warning"><i class="fas fa-edit"></i></Button>
                                                <Button onClick={() => this.handleDelete(emp.id)} variant="danger"><i class="fas fa-trash"></i></Button>
                                            </ButtonGroup>
                                            <br />
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Add New and Update employee Modal */}
                <Modal show={this.state.addEmpModal.show} fullscreen={true} onHide={() => this.handleModal()}>
                    <div className="container py-5">
                        <Card className="border border-info">
                            <Modal.Header closeButton className="bg-info">
                                <Modal.Title>
                                    {this.state.isUpdate
                                        ? "Update Employee Form"
                                        : "Add New Employee Form"}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.isUpdate
                                    ? <ManageForm
                                        newEmp={this.state.editEmp}
                                        handleForm={this.handleForm}
                                        handleInput={this.handleInput}
                                    />
                                    :
                                    <ManageForm
                                        newEmp={this.state.newEmp}
                                        handleForm={this.handleForm}
                                        handleInput={this.handleInput}
                                    />
                                }
                            </Modal.Body>
                        </Card>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Crud
