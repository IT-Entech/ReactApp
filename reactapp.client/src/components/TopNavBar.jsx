import { Navbar, Container, Button } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";

export default function TopNavbar({ activeTab, setSidebarOpen }) {
    const getTitle = () => {
        switch (activeTab) {
            case "dashboard":
                return "Dashboard";
            case "customers":
                return "Customer Management";
            case "sales":
                return "Sales & Deals";
            case "salespeople":
                return "Salesperson Management";
            case "reports":
                return "Reports & Analytics";
            default:
                return "";
        }
    };

    return (
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
                    {getTitle()}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
