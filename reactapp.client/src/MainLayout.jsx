"use client"

import { useState } from "react"
// 1. Import สิ่งที่จำเป็นสำหรับ Routing
import { Outlet, useLocation, Link } from "react-router-dom"

// 2. Import เฉพาะ components และ icons ที่ Layout ใช้
import { MdDashboard } from "react-icons/md";
import { FiUsers, FiFileText, FiMenu } from "react-icons/fi";
import { FaArrowTrendUp, FaCircleUser, FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { Container, Nav, Navbar, Offcanvas, Button } from "react-bootstrap"

// (เราลบ import ของ recharts, Filters, Datahooks, ฯลฯ เพราะมันจะไปอยู่ใน DashboardPage.jsx)

function MainLayout() {
    // (ลบ activeTab state)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    // (ลบ filter states และ useSalesData)

    // 3. ใช้ useLocation เพื่อเช็ค active path
    const location = useLocation();
    const { pathname } = location; // pathname คือ URL ปัจจุบัน (เช่น "/", "/customers")

    // 4. ฟังก์ชันช่วยสำหรับแสดง Title
    const getPageTitle = () => {
        switch (pathname) {
            case "/":
                return "Dashboard";
            case "/customers":
                return "Customer Management";
            case "/sales":
                return "Sales & Deals";
            case "/salesperson":
                return "Salesperson Management";
            case "/reports":
                return "Reports & Analytics";
            default:
                return "CRM System";
        }
    };

    return (
        <>
            <div className="d-flex" style={{ minHeight: "100vh", background: "var(--color-background)" }}>
                {/* Offcanvas (Mobile Sidebar) */}
                <Offcanvas
                    show={sidebarOpen}
                    onHide={() => setSidebarOpen(false)}
                    className="d-lg-none"
                    style={{ background: "var(--color-sidebar)", borderRight: "1px solid var(--color-sidebar-border)" }}
                >
                    <Offcanvas.Header
                        closeButton
                        closeVariant="white"
                        className="border-bottom"
                        style={{ borderColor: "var(--color-sidebar-border)" }}
                    >
                        <Offcanvas.Title style={{ color: "white", fontWeight: 600 }}>
                            <span className="d-flex align-items-center gap-2">
                                <MdDashboard />
                                CRM System
                            </span>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-3">
                        <Nav className="flex-column gap-1">
                            {/* 5. เปลี่ยน Nav.Link ทั้งหมด */}
                            <Nav.Link
                                as={Link} // ใช้ Link
                                to="/"      // กำหนด path
                                onClick={() => setSidebarOpen(false)}
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{
                                    color: "white",
                                    // เช็ค active จาก pathname
                                    background: pathname === "/" ? "var(--color-sidebar-primary)" : "transparent",
                                    fontWeight: pathname === "/" ? 500 : 400,
                                }}
                            >
                                <MdDashboard />
                                Dashboard
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/customers"
                                onClick={() => setSidebarOpen(false)}
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{
                                    color: "white",
                                    background: pathname === "/customers" ? "var(--color-sidebar-primary)" : "transparent",
                                    fontWeight: pathname === "/customers" ? 500 : 400,
                                }}
                            >
                                <FiUsers />
                                Customers
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/sales"
                                onClick={() => setSidebarOpen(false)}
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{
                                    color:
                                        pathname === "/sales" ? "var(--color-sidebar-primary-foreground)" : "var(--color-sidebar-foreground)",
                                    background: pathname === "/sales" ? "var(--color-sidebar-primary)" : "transparent",
                                    fontWeight: pathname === "/sales" ? 500 : 400,
                                }}
                            >
                                <FaArrowTrendUp />
                                Sales & Deals
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/salesperson"
                                onClick={() => setSidebarOpen(false)}
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{
                                    color:
                                        pathname === "/salesperson"
                                            ? "var(--color-sidebar-primary-foreground)"
                                            : "var(--color-sidebar-foreground)",
                                    background: pathname === "/salesperson" ? "var(--color-sidebar-primary)" : "transparent",
                                    fontWeight: pathname === "/salesperson" ? 500 : 400,
                                }}
                            >
                                <FaCircleUser />
                                salesperson
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/reports"
                                onClick={() => setSidebarOpen(false)}
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{
                                    color:
                                        pathname === "/reports"
                                            ? "var(--color-sidebar-primary-foreground)"
                                            : "var(--color-sidebar-foreground)",
                                    background: pathname === "/reports" ? "var(--color-sidebar-primary)" : "transparent",
                                    fontWeight: pathname === "/reports" ? 500 : 400,
                                }}
                            >
                                <FiFileText />
                                Reports
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Desktop Sidebar */}
                <div
                    className={`d-none d-lg-flex flex-column ${sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
                    style={{
                        minHeight: "100vh",
                        background: "linear-gradient(to right, OKLCH(38.1% 0.176 304.987), OKLCH(35.9% 0.144 278.697), OKLCH(37.9% 0.146 265.522))",
                        borderRight: "1px solid var(--color-sidebar-border)",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        zIndex: 1000,
                        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {/* (Header Sidebar) */}
                    <div
                        className="p-4 border-bottom d-flex align-items-center justify-content-between"
                        style={{ borderColor: "var(--color-sidebar-border)" }}
                    >
                        {!sidebarCollapsed && (
                            <h4
                                className="mb-0 d-flex align-items-center gap-2 sidebar-text"
                                style={{ color: "white", fontWeight: 600, fontSize: "1.1rem" }}
                            >
                                <MdDashboard />
                                CRM System
                            </h4>
                        )}
                        {sidebarCollapsed && (
                            <div className="mx-auto">
                                <MdDashboard />
                            </div>
                        )}
                    </div>

                    {/* (Nav Sidebar) */}
                    <Nav className="flex-column p-3 gap-1 flex-grow-1">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                            style={{
                                color: "white",
                                background: pathname === "/" ? "var(--color-sidebar-primary)" : "transparent",
                                fontWeight: pathname === "/" ? 500 : 400,
                                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                            }}
                            title={sidebarCollapsed ? "Dashboard" : ""}
                        >
                            <MdDashboard />
                            {!sidebarCollapsed && <span className="sidebar-text">Dashboard</span>}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/customers"
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                            style={{
                                color: "white",
                                background: pathname === "/customers" ? "var(--color-sidebar-primary)" : "transparent",
                                fontWeight: pathname === "/customers" ? 500 : 400,
                                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                            }}
                            title={sidebarCollapsed ? "Customers" : ""}
                        >
                            <FiUsers />
                            {!sidebarCollapsed && <span className="sidebar-text">Customers</span>}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/sales"
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                            style={{
                                color: "white",
                                background: pathname === "/sales" ? "var(--color-sidebar-primary)" : "transparent",
                                fontWeight: pathname === "/sales" ? 500 : 400,
                                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                            }}
                            title={sidebarCollapsed ? "Sales & Deals" : ""}
                        >
                            <FaArrowTrendUp />
                            {!sidebarCollapsed && <span className="sidebar-text">Sales & Deals</span>}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/salesperson"
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                            style={{
                                color: "white",
                                background: pathname === "/salesperson" ? "var(--color-sidebar-primary)" : "transparent",
                                fontWeight: pathname === "/salesperson" ? 500 : 400,
                                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                            }}
                            title={sidebarCollapsed ? "salesperson" : ""}
                        >
                            <FaCircleUser />
                            {!sidebarCollapsed && <span className="sidebar-text">salesperson</span>}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/reports"
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                            style={{
                                color: "white",
                                background: pathname === "/reports" ? "var(--color-sidebar-primary)" : "transparent",
                                fontWeight: pathname === "/reports" ? 500 : 400,
                                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                            }}
                            title={sidebarCollapsed ? "Reports" : ""}
                        >
                            <FiFileText />
                            {!sidebarCollapsed && <span className="sidebar-text">Reports</span>}
                        </Nav.Link>
                    </Nav>

                    {/* (Footer Sidebar) */}
                    <div className="p-3 border-top" style={{ borderColor: "var(--color-sidebar-border)" }}>
                        <Button
                            variant="outline-secondary"
                            className="w-100 border-0 d-flex align-items-center justify-content-center"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            style={{
                                color: "white",
                                background: "var(--color-sidebar-accent)",
                            }}
                        >
                            {sidebarCollapsed ? <FaCircleChevronRight /> : <FaCircleChevronLeft />}
                        </Button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div
                    className="flex-grow-1"
                    style={{
                        marginLeft: sidebarCollapsed ? "80px" : "260px",
                        transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {/* Top Navbar */}
                    <Navbar
                        className="border-bottom shadow-sm"
                        style={{
                            background: "var(--color-card)",
                            borderColor: "var(--color-border)",
                            position: "sticky",
                            top: 0,
                            zIndex: 999,
                        }}
                    >
                        <Container fluid className="px-4">
                            <Button
                                variant="outline-secondary"
                                className="d-lg-none me-3 border-0"
                                onClick={() => setSidebarOpen(true)}
                                style={{ color: "var(--color-foreground)" }}
                            >
                                <FiMenu />
                            </Button>
                            <Navbar.Brand
                                className="mb-0 fw-semibold"
                                style={{ fontSize: "1.25rem", color: "var(--color-foreground)" }}
                            >
                                {/* 6. ใช้ฟังก์ชันแสดง Title */}
                                {getPageTitle()}
                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                    {/* Content Area for Pages */}
                    <Container fluid className="p-4" style={{ background: "var(--color-background)" }}>
                        {/* 7. นี่คือจุดที่หน้าต่างๆ (Pages) จะถูก Render */}
                        <Outlet />
                    </Container>
                </div>
            </div>
        </>
    );
}

export default MainLayout;