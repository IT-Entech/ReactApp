"use client"

import { useState, useEffect, useCallback } from "react"
import { Container, Row, Col, Card, Button, Form, Table, Badge, Dropdown, Modal, ProgressBar } from "react-bootstrap"
import { FaFilter } from "react-icons/fa6";
import { useQuotationsData } from "./Datahooks/useQuotationsData";
import Filters from "./components/Filters";
import CustomerPagination from "./components/Pagination"
import GoogleMap from "./components/GoogleMap";

export function SalesList() {

    const [yearFilter, setYearFilter] = useState(2025)
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0")
    const [monthFilter, setMonthFilter] = useState(currentMonth)
    const [selectedStaff, setSelectedStaff] = useState("all")

    const {
        QuotationsData,
        years,
        staffFilter,
        loading
    } = useQuotationsData({ yearFilter, monthFilter, selectedStaff });

   

    const [quotations, setQuotations] = useState([]);
    useEffect(() => {
        if (QuotationsData) setQuotations(QuotationsData)
    }, [QuotationsData])
    

    // 🔹 Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const [searchQuery, setSearchQuery] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedDeal, setSelectedDeal] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        customer: "",
        salesperson: "",
        value: 0,
        stage: "potential",
        probability: 0,
        expectedCloseDate: "",
        notes: "",
    })

    const filteredQuotations = quotations.filter(
        (deal) =>
            /* deal.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||*/
            deal.track.toLowerCase().includes(searchQuery.toLowerCase()) || 
            deal.stage.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const totalPages = Math.ceil(filteredQuotations.length / rowsPerPage)
    const currentQuotations = filteredQuotations.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleAddDeal = () => {
        const newDeal = {
            id: Date.now().toString(),
            ...formData,
            createdAt: new Date().toISOString().split("T")[0],
        }
        setQuotations([...quotations, newDeal])
        setShowAddModal(false)
        resetForm()
    }

    const handleEditDeal = () => {
        if (!selectedDeal) return
        setQuotations(quotations.map((d) => (d.id === selectedDeal.id ? { ...selectedDeal, ...formData } : d)))
        setShowEditModal(false)
        setSelectedDeal(null)
        resetForm()
    }

    const openEditModal = (deal) => {
        setSelectedDeal(deal)
        setFormData({
            title: deal.qt_no,
            customer: deal.customer_name,
            salesperson: deal.salesperson,
            value: deal.value,
            stage: deal.stage,
            probability: deal.probability,
            expectedCloseDate: deal.expectedCloseDate,
            notes: deal.remark,
        })
        setShowEditModal(true)
    }

    const resetForm = () => {
        setFormData({
            title: "",
            customer: "",
            salesperson: "",
            value: 0,
            stage: "potential",
            probability: 0,
            expectedCloseDate: "",
            notes: "",
        })
    }

    const getStageBadge = (stage) => {
        const config = {
            prospect: { bg: "primary", text: "Prospect" },
            potential: { bg: "info", text: "Potential" },
            proposal: { bg: "primary", text: "Proposal" },
            "อยู่ระหว่างติดตาม": { bg: "warning", text: "อยู่ระหว่างติดตาม" },
            "pipeline": { bg: "success", text: "Pipeline" },
            "ได้งาน": { bg: "success", text: "ได้งานแล้ว" },
            "ไม่ได้งาน": { bg: "danger", text: "ไม่ได้งาน" },
        }
        const { bg, text } = config[stage] || config.prospect
        return <Badge bg={bg}>{text}</Badge>
    }

    const [distanceData, setDistanceData] = useState(null);
    const [vehicleType, setVehicleType] = useState("03");
    const fuelRate = {
        "03": 10,
        "01": 2.7,
        "02": 2.6,
    };

    const maintenance = {
        "03": 1,
        "01": 3.74,
        "02": 3.74,
    };

    // เมื่อได้รับข้อมูลระยะทางจาก MyGoogleMap
    const handleDistanceCalculated = useCallback((data) => {
        const fuelCostPerLitre = 35;
        const kmPerLitre = fuelRate[vehicleType]; 
        const maintenanceCostPerKm = maintenance[vehicleType] || 0;
        const distanceWithBuffer = data.distanceValue + 20; // เพิ่มระยะทาง 20 กม.

        const transportCost = distanceWithBuffer * maintenanceCostPerKm;
        const fuelCost =
            (distanceWithBuffer / kmPerLitre) * fuelCostPerLitre;
        const totalCost = transportCost + fuelCost;

        setDistanceData({
            ...data,
            distanceWithBuffer,
            transportCost,
            fuelCost,
            totalCost,
        });
    }, [vehicleType]);



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
                            <h4 className="mb-0">Sales & Deals</h4>
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
                                <option value={150}>150 per page</option>
                            </Form.Select>
                        </Col>
                        <Col md={4} className="text-end">
                            <Row className="g-2">
                                <Col md={8}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search stage..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant="primary" className="w-100" onClick={() => setShowAddModal(true)}>
                                        + Add Quotation
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
                                <th>QT NO</th>
                                <th>Name</th>
                                <th>Customer</th>
                                <th>Salesperson</th>
                                <th>Stage</th>
                                <th>Remark</th>
                                <th>Status</th>
                                <th className="text-end">Value</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentQuotations.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center text-muted py-4">
                                        No deals found
                                    </td>
                                </tr>
                            ) : (
                                    currentQuotations.map((qt) => (
                                        <tr key={qt.qt_no}>
                                        <td className="fw-bold">{qt.qt_no}</td>
                                        <td className="fw-bold">{qt.name}</td>
                                        <td>{qt.customer_name}</td>
                                        <td>{qt.salesperson}</td>
                                        <td>{getStageBadge(qt.stage)}</td>
                                        <td>{qt.remark}</td>
                                        <td>{getStageBadge(qt.track)}</td>
                                        <td className="text-end fw-bold text-success">฿{qt.value.toLocaleString()}</td>
                                        <td className="text-center">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" size="sm">
                                                    ⋮
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => openEditModal(qt)}>✏️ Edit</Dropdown.Item>
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

            {/* Add/Edit Modals - similar structure to customer-list */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="fullscreen">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Deal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Deal Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enterprise Software License"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.customer}
                                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                        placeholder="Acme Corp"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Salesperson</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.salesperson}
                                        onChange={(e) => setFormData({ ...formData, salesperson: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Deal Value (฿)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) || 0 })}
                                        placeholder="100000"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Probability (%)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.probability}
                                        onChange={(e) => setFormData({ ...formData, probability: Number.parseInt(e.target.value) || 0 })}
                                        placeholder="50"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>🚚 ประเภทรถ:</Form.Label>
                                    <Form.Select
                                        value={vehicleType}
                                        onChange={(e) => setVehicleType(e.target.value)}
                                    >
                                        <option value="03">รถเล็ก</option>
                                        <option value="01">รถใหญ่เดี่ยว</option>
                                        <option value="02">รถใหญ่พ่วง</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Expected Close Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.expectedCloseDate}
                                        onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
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
                        <div className="container py-4">
                            <h3 className="mb-3">📍 ระบบคำนวณค่าขนส่ง</h3>

                            {/* ส่วนของ Map */}             
                            <GoogleMap onDistanceCalculated={handleDistanceCalculated} />

                            {/* ส่วนแสดงผลลัพธ์ */}
                            {distanceData && (
                                <div className="mt-4">
                                    <h5>📊 ผลลัพธ์</h5>
                                    <table className="table table-bordered mt-2">
                                        <tbody>
                                            <tr>
                                                <th>ระยะทาง + 20กม.</th>
                                                <td>{distanceData.distanceWithBuffer.toFixed(2)} กม.</td>
                                            </tr>
                                            <tr>
                                                <th>ระยะเวลา</th>
                                                <td>{distanceData.durationText}</td>
                                            </tr>
                                            <tr>
                                                <th>ค่าเสื่อมสภาพ ({maintenance[vehicleType]} บาท/กม.)</th>
                                                <td>{distanceData.transportCost.toFixed(2)} บาท</td>
                                            </tr>
                                            <tr>
                                                <th>ค่าน้ำมัน ({fuelRate[vehicleType]} กม./ลิตร)</th>
                                                <td>{distanceData.fuelCost.toFixed(2)} บาท</td>
                                            </tr>
                                            <tr className="table-success">
                                                <th>ยอดรวมทั้งหมด</th>
                                                <td>
                                                    <strong>{distanceData.totalCost.toFixed(2)} บาท</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddDeal}>
                        Add Deal
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal - similar to Add Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Deal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Deal Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.customer}
                                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Salesperson</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.salesperson}
                                        onChange={(e) => setFormData({ ...formData, salesperson: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Deal Value (฿)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) || 0 })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Probability (%)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.probability}
                                        onChange={(e) => setFormData({ ...formData, probability: Number.parseInt(e.target.value) || 0 })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stage</Form.Label>
                                    <Form.Select
                                        value={formData.stage}
                                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                    >
                                        <option value="prospect">Prospect</option>
                                        <option value="potential">Potential</option>
                                        <option value="pipeline">Pipeline</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Expected Close Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.expectedCloseDate}
                                        onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
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
                    <Button variant="primary" onClick={handleEditDeal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
