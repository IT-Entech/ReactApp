"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, Nav } from "react-bootstrap"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"

const salesByMonthData = [
    { month: "Jan", sales: 186000, deals: 8 },
    { month: "Feb", sales: 205000, deals: 10 },
    { month: "Mar", sales: 237000, deals: 12 },
    { month: "Apr", sales: 273000, deals: 14 },
    { month: "May", sales: 209000, deals: 9 },
    { month: "Jun", sales: 264000, deals: 13 },
]

const salesBySalespersonData = [
    { name: "Alice Johnson", sales: 450000, deals: 12 },
    { name: "Bob Smith", sales: 380000, deals: 10 },
    { name: "Carol Davis", sales: 520000, deals: 15 },
]

const dealsByStageData = [
    { stage: "Prospecting", count: 25, value: 1250000 },
    { stage: "Qualification", count: 18, value: 890000 },
    { stage: "Proposal", count: 12, value: 670000 },
    { stage: "Negotiation", count: 8, value: 450000 },
    { stage: "Closed Won", count: 37, value: 2100000 },
    { stage: "Closed Lost", count: 15, value: 0 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B9D"]

export function ReportsExport() {
    const [reportType, setReportType] = useState("sales")
    const [dateRange, setDateRange] = useState("last-6-months")
    const [exportFormat, setExportFormat] = useState("csv")
    const [activeTab, setActiveTab] = useState("sales")

    const handleExport = () => {
        const filename = `${reportType}-report-${dateRange}.${exportFormat}`
        alert(`Exporting ${filename}...`)
    }

    return (
        <Container fluid className="p-4">
            {/* Export Controls */}
            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-white">
                    <h4 className="mb-0">Export Data</h4>
                    <small className="text-muted">Generate and download reports in various formats</small>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Report Type</Form.Label>
                                <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                    <option value="sales">Sales Report</option>
                                    <option value="customers">Customer Report</option>
                                    <option value="deals">Deals Report</option>
                                    <option value="salespeople">Salesperson Report</option>
                                    <option value="performance">Performance Report</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date Range</Form.Label>
                                <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                                    <option value="last-7-days">Last 7 Days</option>
                                    <option value="last-30-days">Last 30 Days</option>
                                    <option value="last-3-months">Last 3 Months</option>
                                    <option value="last-6-months">Last 6 Months</option>
                                    <option value="last-year">Last Year</option>
                                    <option value="all-time">All Time</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Format</Form.Label>
                                <Form.Select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
                                    <option value="csv">CSV</option>
                                    <option value="xlsx">Excel (XLSX)</option>
                                    <option value="pdf">PDF</option>
                                    <option value="json">JSON</option>
                                    <option value="xml">XML</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="d-flex align-items-end">
                            <Button variant="primary" className="w-100 mb-3" onClick={handleExport}>
                                📥 Export
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Quick Export Buttons */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="shadow-sm border-primary cursor-pointer" onClick={() => alert("Exporting customers...")}>
                        <Card.Body className="text-center">
                            <div className="fs-1 mb-2">👥</div>
                            <h6>Export Customers</h6>
                            <small className="text-muted">Download all customer data</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm border-success cursor-pointer" onClick={() => alert("Exporting deals...")}>
                        <Card.Body className="text-center">
                            <div className="fs-1 mb-2">📈</div>
                            <h6>Export Deals</h6>
                            <small className="text-muted">Download all deals data</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm border-warning cursor-pointer" onClick={() => alert("Exporting sales...")}>
                        <Card.Body className="text-center">
                            <div className="fs-1 mb-2">💰</div>
                            <h6>Export Sales</h6>
                            <small className="text-muted">Download sales performance</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm border-info cursor-pointer" onClick={() => alert("Exporting team...")}>
                        <Card.Body className="text-center">
                            <div className="fs-1 mb-2">🎯</div>
                            <h6>Export Team</h6>
                            <small className="text-muted">Download team performance</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Analytics Dashboard */}
            <Card className="shadow-sm">
                <Card.Header className="bg-white">
                    <h4 className="mb-0">Analytics & Insights</h4>
                    <small className="text-muted">Visual reports and performance metrics</small>
                </Card.Header>
                <Card.Body>
                    <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="sales">📊 Sales</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="team">👥 Team</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="pipeline">🔄 Pipeline</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {activeTab === "sales" && (
                        <Card>
                            <Card.Header>
                                <h5>Sales by Month</h5>
                                <small className="text-muted">Monthly sales performance over the last 6 months</small>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={salesByMonthData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value, name) => [
                                                name === "sales" ? `$${value.toLocaleString()}` : value,
                                                name === "sales" ? "Sales" : "Deals",
                                            ]}
                                        />
                                        <Legend />
                                        <Bar dataKey="sales" fill="#0088FE" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="deals" fill="#00C49F" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    )}

                    {activeTab === "team" && (
                        <Card>
                            <Card.Header>
                                <h5>Sales by Salesperson</h5>
                                <small className="text-muted">Individual performance comparison</small>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={salesBySalespersonData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <YAxis dataKey="name" type="category" width={120} />
                                        <Tooltip
                                            formatter={(value, name) => [
                                                name === "sales" ? `$${value.toLocaleString()}` : value,
                                                name === "sales" ? "Sales" : "Deals",
                                            ]}
                                        />
                                        <Legend />
                                        <Bar dataKey="sales" fill="#8884D8" radius={[0, 8, 8, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    )}

                    {activeTab === "pipeline" && (
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h5>Deals by Stage</h5>
                                        <small className="text-muted">Distribution across pipeline stages</small>
                                    </Card.Header>
                                    <Card.Body>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={dealsByStageData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ stage, count }) => `${stage}: ${count}`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="count"
                                                >
                                                    {dealsByStageData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h5>Pipeline Summary</h5>
                                        <small className="text-muted">Detailed breakdown by stage</small>
                                    </Card.Header>
                                    <Card.Body>
                                        {dealsByStageData.map((stage, index) => (
                                            <div key={stage.stage} className="d-flex justify-content-between align-items-center mb-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div
                                                        className="rounded-circle"
                                                        style={{
                                                            width: "12px",
                                                            height: "12px",
                                                            backgroundColor: COLORS[index % COLORS.length],
                                                        }}
                                                    />
                                                    <span className="fw-bold">{stage.stage}</span>
                                                </div>
                                                <div className="text-end">
                                                    <div className="fw-bold">{stage.count} deals</div>
                                                    <small className="text-muted">${stage.value.toLocaleString()}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}
