import { Offcanvas, Nav, Button } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { FiUsers, FiFileText } from "react-icons/fi";
import { FaArrowTrendUp, FaCircleUser, FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export default function Sidebar({
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarOpen,
    setSidebarOpen,
}) {
    return (
        <>
            {/* Mobile Sidebar */}
            <Offcanvas
                show={sidebarOpen}
                onHide={() => setSidebarOpen(false)}
                className="d-lg-none"
                style={{
                    background: "var(--color-sidebar)",
                    borderRight: "1px solid var(--color-sidebar-border)",
                }}
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
                        {[
                            { key: "dashboard", icon: <MdDashboard />, label: "Dashboard" },
                            { key: "customers", icon: <FiUsers />, label: "Customers" },
                            { key: "sales", icon: <FaArrowTrendUp />, label: "Sales & Deals" },
                            { key: "salespeople", icon: <FaCircleUser />, label: "Salespeople" },
                            { key: "reports", icon: <FiFileText />, label: "Reports" },
                        ].map((item) => (
                            <Nav.Link
                                key={item.key}
                                active={activeTab === item.key}
                                onClick={() => {
                                    setActiveTab(item.key);
                                    setSidebarOpen(false);
                                }}
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                                style={{
                                    color: "white",
                                    background:
                                        activeTab === item.key
                                            ? "var(--color-sidebar-primary)"
                                            : "transparent",
                                    fontWeight: activeTab === item.key ? 500 : 400,
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Desktop Sidebar */}
            <div
                className={`d-none d-lg-flex flex-column ${sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
                    }`}
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(to right, OKLCH(38.1% 0.176 304.987), OKLCH(35.9% 0.144 278.697), OKLCH(37.9% 0.146 265.522))",
                    borderRight: "1px solid var(--color-sidebar-border)",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: 1000,
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    className="p-4 border-bottom d-flex align-items-center justify-content-between"
                    style={{ borderColor: "var(--color-sidebar-border)" }}
                >
                    {!sidebarCollapsed ? (
                        <h4
                            className="mb-0 d-flex align-items-center gap-2 sidebar-text"
                            style={{ color: "white", fontWeight: 600, fontSize: "1.1rem" }}
                        >
                            <MdDashboard />
                            CRM System
                        </h4>
                    ) : (
                        <div className="mx-auto">
                            <MdDashboard />
                        </div>
                    )}
                </div>

                <Nav className="flex-column p-3 gap-1 flex-grow-1">
                    {[
                        { key: "dashboard", icon: <MdDashboard />, label: "Dashboard" },
                        { key: "customers", icon: <FiUsers />, label: "Customers" },
                        { key: "sales", icon: <FaArrowTrendUp />, label: "Sales & Deals" },
                        { key: "salespeople", icon: <FaCircleUser />, label: "Salespeople" },
                        { key: "reports", icon: <FiFileText />, label: "Reports" },
                    ].map((item) => (
                        <Nav.Link
                            key={item.key}
                            active={activeTab === item.key}
                            onClick={() => setActiveTab(item.key)}
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                            style={{
                                color: "white",
                                background:
                                    activeTab === item.key
                                        ? "var(--color-sidebar-primary)"
                                        : "transparent",
                                fontWeight: activeTab === item.key ? 500 : 400,
                                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                            }}
                            title={sidebarCollapsed ? item.label : ""}
                        >
                            {item.icon}
                            {!sidebarCollapsed && <span className="sidebar-text">{item.label}</span>}
                        </Nav.Link>
                    ))}
                </Nav>

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
                    <Navbar.Brand
                        className="mb-0 fw-semibold"
                        style={{ fontSize: "1.25rem", color: "var(--color-foreground)" }}
                    >
                        {activeTab === "dashboard" && "Dashboard"}
                        {activeTab === "customers" && "Customer Management"}
                        {activeTab === "sales" && "Sales & Deals"}
                        {activeTab === "salespeople" && "Salesperson Management"}
                        {activeTab === "reports" && "Reports & Analytics"}
                    </Navbar.Brand>
                </div>
            </div>
        </>
    );
}
