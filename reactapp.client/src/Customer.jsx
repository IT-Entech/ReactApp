"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Form, Table, Badge, Dropdown, Modal, Pagination } from "react-bootstrap"
import { FaFilter } from "react-icons/fa6";
import { useCustomersData } from "./Datahooks/useCustomersData";
import Filters from "./components/Filters";
import CustomerPagination from "./components/Pagination"

export function CustomerList() {

   
    const [yearFilter, setYearFilter] = useState(2025)
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0")
    const [monthFilter, setMonthFilter] = useState(currentMonth)
    const [selectedStaff, setSelectedStaff] = useState("all")

    const {
        CustomerData,
        years,
        staffFilter,
        loading
    } = useCustomersData({ yearFilter, monthFilter, selectedStaff });

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        if (CustomerData) setCustomers(CustomerData)
    }, [CustomerData])

    // 🔹 Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const [searchQuery, setSearchQuery] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [formData, setFormData] = useState({
        channel: "N",
        group: "00",
        tools: "00",
        search: "",
        email: "",
        phone: "",
        factoryNo: "",
        company: "",
        status: "lead",
    })

    const filteredCustomers = customers.filter((customer) =>
        (customer.customer_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (customer.status || "").toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage)
    const currentCustomers = filteredCustomers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleAddCustomer = () => {
        const newCustomer = {
            id: Date.now().toString(),
            ...formData,
            createdAt: new Date().toISOString().split("T")[0],
        }
        setCustomers([...customers, newCustomer])
        setShowAddModal(false)
        resetForm()
    }

    const handleEditCustomer = () => {
        if (!selectedCustomer) return
        setCustomers(customers.map((c) => (c.id === selectedCustomer.id ? { ...selectedCustomer, ...formData } : c)))
        setShowEditModal(false)
        setSelectedCustomer(null)
        resetForm()
    }

    const openEditModal = (customer) => {
        setSelectedCustomer(customer)
        setFormData({
            id: customer.appoint_no,
            name: customer.name,
            email: customer.email,
            phone: customer.tel,
            company: customer.customer_name,
            status: customer.status,
        })
        setShowEditModal(true)
    }

    const resetForm = () => {
        setFormData({
            channel: "N",
            group: "00",
            tools: "00",
            search: "",
            email: "",
            phone: "",
            factoryNo: "",
            company: "",
            status: "lead",
        })
    }

    const getStatusBadge = (status) => {
        const variants = {
            active: "success",
            quotation: "primary",
            lead: "secondary",
            prequotation: "warning",
        }
        return <Badge bg={variants[status]}>{status.toUpperCase()}</Badge>
    }

    return (
        <Container fluid className="p-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-white border-bottom">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <FaFilter />
                        <h5 className="mb-0 fw-semibold" style={{ color: "var(--color-foreground)" }}>
                            Filters
                        </h5>
                    </div>
                    <Filters
                        filters={["year", "month", "staff"]}
                        yearFilter={yearFilter}
                        setYearFilter={setYearFilter}
                        monthFilter={monthFilter}
                        setMonthFilter={setMonthFilter}
                        selectedStaff={selectedStaff}
                        setSelectedStaff={setSelectedStaff}
                        staffFilter={staffFilter}
                        years={years}
                        loading={loading}
                    />
                </Card.Header>
            </Card>
            <Card className="shadow-sm">
                <Card.Header className="bg-white border-bottom">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h4 className="mb-0">Customers</h4>
                        </Col>
                        <Col md={2} className="mb-2">
                            <Form.Select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value))
                                    setCurrentPage(1) // reset page to 1
                                }}
                            >
                                <option value={10}>10 per page</option>
                                <option value={25}>25 per page</option>
                                <option value={50}>50 per page</option>
                                <option value={100}>100 per page</option>
                            </Form.Select>
                        </Col>
                        <Col md={4} className="text-end">
                            <Row className="g-2">
                                <Col md={8}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search customers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant="primary" className="w-100" onClick={() => setShowAddModal(true)}>
                                        + Add Customer
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>AP NO</th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        No customers found
                                    </td>
                                </tr>
                            ) : (
                                    currentCustomers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="fw-bold">{customer.appoint_no}</td>
                                        <td className="fw-bold">{customer.name}</td>
                                        <td>{customer.customer_name}</td>
                                        <td>
                                            <div className="small">
                                                <div className="text-muted">📧 {customer.email}</div>
                                                <div className="text-muted">📞 {customer.tel}</div>
                                            </div>
                                        </td>
                                        <td>{getStatusBadge(customer.status)}</td>
                                        <td className="text-center">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" size="sm">
                                                    ⋮
                                                </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => openEditModal(customer)}>+ Add Quotation</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item onClick={() => openEditModal(customer)}>✏️ Edit</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <CustomerPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </Card.Body>
            </Card>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Channels</Form.Label>
                                    <Form.Select
                                        value={formData.channel}
                                        onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                                    >
                                        <option value="N">N/A</option>
                                        <option value="I">Online</option>
                                        <option value="O">Offline</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ช่องทางที่พบ</Form.Label>
                                    <Form.Select
                                        value={formData.group}
                                        onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                                    >
                                        <option value="00">N/A</option>
                                        <option value="01">Google</option>
                                        <option value="02">Facebook</option>
                                        <option value="03">Instragram</option>
                                        <option value="04">Tiktok</option>
                                        <option value="05">Line</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ช่องทางที่พบ</Form.Label>
                                    <Form.Select
                                        value={formData.tools}
                                        onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                                    >
                                        <option value="00">N/A</option>
                                        <option value="01">Contact Form</option>
                                        <option value="02">Email</option>
                                        <option value="03">Line OA</option>
                                        <option value="04">Hotline</option>
                                        <option value="05">Office (Call in)</option>
                                        <option value="06">Website</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>คำค้นหา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.search}
                                        onChange={(e) => setFormData({ ...formData, search: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ทะเบียนโรงงาน</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.factoryNo}
                                        onChange={(e) => setFormData({ ...formData, factoryNo: e.target.value })}
                                        placeholder=""
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ชื่อโรงงาน</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder=""
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="lead">Lead</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="prequotation">Pre quotation</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>  
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Value ($)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) || 0 })}
                                        placeholder="50000"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Additional notes..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCustomer}>
                        Add Customer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="lead">Lead</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="prequotation">Pre quotation</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Value ($)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) || 0 })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditCustomer}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

