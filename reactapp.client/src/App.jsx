import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import SalesPage from "./pages/SalesPage";
import SalespersonPage from "./pages/SalespersonPage";
import ReportsPage from "./pages/ReportsPage";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MainLayout จะเป็นกรอบสำหรับทุกหน้า */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/sales" element={<SalesPage />} />
                    <Route path="/salesperson" element={<SalespersonPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;