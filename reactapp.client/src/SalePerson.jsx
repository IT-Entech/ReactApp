"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, Table, Badge, Dropdown, Modal, ProgressBar } from "react-bootstrap"

export function SalespersonList() {
    const [salespeople, setSalespeople] = useState([
        {
            id: "1",
            name: "Alice Johnson",
            email: "alice.j@company.com",
            phone: "+1 (555) 111-2222",
            territory: "North America",
            status: "active",
            totalSales: 450000,
            dealsWon: 12,
            dealsInProgress: 8,
            quota: 500000,
            quotaAchieved: 90,
            joinedDate: "2023-01-15",
        },
        {
            id: "2",
            name: "Bob Smith",
            email: "bob.smith@company.com",
            phone: "+1 (555) 222-3333",
            territory: "Europe",
            status: "active",
            totalSales: 380000,
            dealsWon: 10,
            dealsInProgress: 6,
            quota: 450000,
            quotaAchieved: 84,
            joinedDate: "2023-03-20",
        },
        {
            id: "3",
            name: "Carol Davis",
            email: "carol.d@company.com",
            phone: "+1 (555) 333-4444",
            territory: "Asia Pacific",
            status: "active",
            totalSales: 520000,
            dealsWon: 15,
            dealsInProgress: 10,
            quota: 500000,
            quotaAchieved: 104,
            joinedDate: "2022-11-05",
        },
    ])

    const [searchQuery, setSearchQuery] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedSalesperson, setSelectedSalesperson] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        territory: "",
        status: "active",
        quota: 0,
    })

    const filteredSalespeople = salespeople.filter(
        (person) =>
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.territory.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleAddSalesperson = () => {
        const newSalesperson = {
            id: Date.now().toString(),
            ...formData,
            totalSales: 0,
            dealsWon: 0,
            dealsInProgress: 0,
            quotaAchieved: 0,
            joinedDate: new Date().toISOString().split("T")[0],
        }
        setSalespeople([...salespeople, newSalesperson])
        setShowAddModal(false)
        resetForm()
    }

    const handleEditSalesperson = () => {
        if (!selectedSalesperson) return
        setSalespeople(
            salespeople.map((s) =>
                s.id === selectedSalesperson.id
                    ? {
                        ...s,
                        ...formData,
                        quotaAchieved: formData.quota > 0 ? Math.round((s.totalSales / formData.quota) * 100) : 0,
                    }
                    : s,
            ),
        )
        setShowEditModal(false)
        setSelectedSalesperson(null)
        resetForm()
    }

    const handleDeleteSalesperson = (id) => {
        setSalespeople(salespeople.filter((s) => s.id !== id))
    }

    const openEditDialog = (salesperson) => {
        setSelectedSalesperson(salesperson)
        setFormData({
            name: salesperson.name,
            email: salesperson.email,
            phone: salesperson.phone,
            territory: salesperson.territory,
            status: salesperson.status,
            quota: salesperson.quota,
        })
        setShowEditModal(true)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            territory: "",
            status: "active",
            quota: 0,
        })
    }

    const getQuotaVariant = (achieved) => {
        if (achieved >= 100) return "success"
        if (achieved >= 75) return "warning"
        return "danger"
    }

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <Container fluid className="p-4">
            {/* Summary Cards */}
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm border-primary">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-1">Total Salespeople</h6>
                                    <h2 className="mb-0">{salespeople.filter((s) => s.status === "active").length}</h2>
                                    <small className="text-muted">Active team members</small>
                                </div>
                                <div className="fs-1">👥</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-success">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-1">Total Sales</h6>
                                    <h2 className="mb-0 text-success">
                                        ${salespeople.reduce((sum, s) => sum + s.totalSales, 0).toLocaleString()}
                                    </h2>
                                    <small className="text-muted">Combined performance</small>
                                </div>
                                <div className="fs-1">💰</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-info">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-1">Avg Quota Achievement</h6>
                                    <h2 className="mb-0 text-info">
                                        {Math.round(salespeople.reduce((sum, s) => sum + s.quotaAchieved, 0) / salespeople.length)}%
                                    </h2>
                                    <small className="text-muted">Team average</small>
                                </div>
                                <div className="fs-1">🎯</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow-sm">
                <Card.Header className="bg-white border-bottom">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h4 className="mb-0">Sales Team</h4>
                        </Col>
                        <Col md={6} className="text-end">
                            <Row className="g-2">
                                <Col md={8}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search salespeople..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant="primary" className="w-100" onClick={() => setShowAddModal(true)}>
                                        + Add Salesperson
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
                                <th>Salesperson</th>
                                <th>Territory</th>
                                <th>Contact</th>
                                <th>Performance</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalespeople.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        No salespeople found
                                    </td>
                                </tr>
                            ) : (
                                filteredSalespeople.map((person) => (
                                    <tr key={person.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                                    style={{ width: "40px", height: "40px", fontWeight: "bold" }}
                                                >
                                                    {getInitials(person.name)}
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{person.name}</div>
                                                    <small className="text-muted">
                                                        {person.dealsWon} deals won • {person.dealsInProgress} in progress
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{person.territory}</td>
                                        <td>
                                            <div className="small">
                                                <div className="text-muted">📧 {person.email}</div>
                                                <div className="text-muted">📞 {person.phone}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ minWidth: "200px" }}>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <small className="text-muted">Quota Achievement</small>
                                                    <small className="fw-bold">{person.quotaAchieved}%</small>
                                                </div>
                                                <ProgressBar
                                                    now={person.quotaAchieved}
                                                    variant={getQuotaVariant(person.quotaAchieved)}
                                                    style={{ height: "8px" }}
                                                />
                                                <small className="text-muted">
                                                    ${person.totalSales.toLocaleString()} / ${person.quota.toLocaleString()}
                                                </small>
                                            </div>
                                        </td>
                                        <td>
                                            <Badge bg={person.status === "active" ? "success" : "secondary"}>
                                                {person.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="text-center">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" size="sm">
                                                    ⋮
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => openEditDialog(person)}>✏️ Edit</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item className="text-danger" onClick={() => handleDeleteSalesperson(person.id)}>
                                                        🗑️ Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Salesperson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@company.com"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 123-4567"
                            />
                        </Form.Group>
                        <Form.Group controlId="formTerritory">
                            <Form.Label>Territory</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.territory}
                                onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                                placeholder="North America"
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuota">
                            <Form.Label>Sales Quota ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.quota}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quota: Number.parseFloat(e.target.value) || 0,
                                    })
                                }
                                placeholder="500000"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddSalesperson}>
                        Add Salesperson
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Salesperson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditTerritory">
                            <Form.Label>Territory</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.territory}
                                onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditQuota">
                            <Form.Label>Sales Quota ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.quota}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quota: Number.parseFloat(e.target.value) || 0,
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowEditModal(false)
                            setSelectedSalesperson(null)
                            resetForm()
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditSalesperson}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
