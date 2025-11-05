"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { useSalesData } from "../Datahooks/useSalesData"; // (ปรับ path)
import Filters from "../components/Filters"; // (ปรับ path)

import { FiUsers, FiDollarSign, FiTarget } from "react-icons/fi";
import { FaArrowTrendUp, FaFilter, FaDownload } from "react-icons/fa6";
import { Container, Row, Col, Card, Button, Form, Table, Badge } from "react-bootstrap"
import {
    ComposedChart,
    Line,
    PieChart,
    Pie,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts"

// ย้ายค่าคงที่มาไว้ที่นี่ด้วย
const PRODUCT_COLORS_BOOTSTRAP = {
    "Product off spec": "#0d6efd",  // primary
    "ขยะอันตราย": "#dc3545",       // danger
    "Cleanning": "#ffc107",          // warning
    "กากตะกอน-ฝุ่นทราย": "#198754", // success
    "อื่น ๆ": "#6c757d",             // secondary
    "Cleaning + กำจัด": "#0dcaf0",   // info
    "N/A": "#fd7e14"                 // orange
};


export default function DashboardPage() {
    // 2. ย้าย state และ hook ทั้งหมดที่เกี่ยวกับ Dashboard มาไว้ที่นี่
    const [yearFilter, setYearFilter] = useState(2025)
    const [monthFilter, setMonthFilter] = useState("00")
    const [channelFilter, setChannelFilter] = useState("N")
    const [selectedStaff, setSelectedStaff] = useState("all")

    const {
        tableData,
        chartData,
        totalRevenue,
        totalDeals,
        filteredProducts,
        years,
        staffFilter,
        loading,
        getMonthAbbr
    } = useSalesData({ yearFilter, monthFilter, channelFilter, selectedStaff });

    // 3. Return เฉพาะ JSX ของเนื้อหา Dashboard
    return (
        <div>
            <Card className="mb-4 border-0 shadow-sm" style={{ background: "var(--color-card)" }}>
                <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <FaFilter />
                        <h5 className="mb-0 fw-semibold" style={{ color: "var(--color-foreground)" }}>
                            Filters
                        </h5>
                    </div>
                    <Filters
                        filters={["year", "month", "channel", "staff"]}
                        yearFilter={yearFilter}
                        setYearFilter={setYearFilter}
                        monthFilter={monthFilter}
                        setMonthFilter={setMonthFilter}
                        channelFilter={channelFilter}
                        setChannelFilter={setChannelFilter}
                        selectedStaff={selectedStaff}
                        setSelectedStaff={setSelectedStaff}
                        staffFilter={staffFilter}
                        years={years}
                        loading={loading}
                    />
                </Card.Body>
            </Card>

            <Row className="g-4 mb-4">
                {/* Total Revenue */}
                <Col md={6} lg={3}>
                    <Card
                        className="h-100 border-0 shadow-sm"
                        style={{
                            background: "linear-gradient(to right, OKLCH(72.3% 0.219 149.579), OKLCH(59.6% 0.145 163.225))"
                        }}
                    >

                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p
                                        className="text-uppercase small fw-medium mb-1"
                                        style={{ color: "white", letterSpacing: "0.5px" }}
                                    >
                                        Total Revenue
                                    </p>
                                    <h3
                                        className="mb-0 fw-bold"
                                        style={{ color: "white", fontSize: "1.75rem" }}
                                    >
                                        {totalRevenue.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                                    </h3>
                                </div>
                                <div className="p-3 rounded" style={{ color: "white", background: "var(--color-primary)", opacity: 1 }}>
                                    <FiDollarSign size={24} />
                                </div>
                            </div>
                            <p className="small mb-0" style={{ color: "var(--color-muted-foreground)" }}>
                                From filtered data
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Total Deals */}
                <Col md={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm" style={{
                        background: "linear-gradient(to right, OKLCH(70.5% 0.213 47.604), OKLCH(57.7% 0.245 27.325))"
                    }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p
                                        className="text-uppercase small fw-medium mb-1"
                                        style={{ color: "white", letterSpacing: "0.5px" }}
                                    >
                                        Total Deals
                                    </p>
                                    <h3
                                        className="mb-0 fw-bold"
                                        style={{ color: "white", fontSize: "1.75rem" }}
                                    >
                                        {totalDeals}
                                    </h3>
                                </div>
                                <div className="p-3 rounded" style={{ color: "white", opacity: 1 }}>
                                    <FiTarget />
                                </div>
                            </div>
                            <p className="small mb-0" style={{ color: "var(--color-muted-foreground)" }}>
                                From filtered data
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {/* New Customers */}
                <Col md={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm" style={{
                        background: "linear-gradient(to right, OKLCH(62.3% 0.214 259.815), oklch(60.9% 0.126 221.723))"
                    }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p
                                        className="text-uppercase small fw-medium mb-1"
                                        style={{ color: "white", letterSpacing: "0.5px" }}
                                    >
                                        New Customers
                                    </p>
                                    <h3
                                        className="mb-0 fw-bold"
                                        style={{ color: "white", fontSize: "1.75rem" }}
                                    >
                                        48
                                    </h3>
                                </div>
                                <div className="p-3 rounded" style={{ color: "white", opacity: 1 }}>
                                    <FiUsers />
                                </div>
                            </div>
                            <p
                                className="small mb-0 d-flex align-items-center gap-1"
                                style={{ color: "var(--color-success)" }}
                            >
                                <FaArrowTrendUp />
                                +8 from last month
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Conversion Rate */}
                <Col md={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm" style={{
                        background: "linear-gradient(to right, oklch(60.6% 0.25 292.717), oklch(51.1% 0.262 276.966))"
                    }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <p
                                        className="text-uppercase small fw-medium mb-1"
                                        style={{ color: "white", letterSpacing: "0.5px" }}
                                    >
                                        Conversion Rate
                                    </p>
                                    <h3
                                        className="mb-0 fw-bold"
                                        style={{ color: "white", fontSize: "1.75rem" }}
                                    >
                                        24.5%
                                    </h3>
                                </div>
                                <div className="p-3 rounded" style={{ color: "white", opacity: 1 }}>
                                    <FaArrowTrendUp />
                                </div>
                            </div>
                            <p
                                className="small mb-0 d-flex align-items-center gap-1"
                                style={{ color: "var(--color-success)" }}
                            >
                                <FaArrowTrendUp />
                                +2.1% from last month
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="g-4 mb-4">
                {/* Sales Trend Chart */}
                <Col lg={8}>
                    <Card className="h-100 border-0 shadow-sm" style={{ background: "var(--color-card)" }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0 fw-semibold" style={{ color: "var(--color-foreground)" }}>
                                    <FaArrowTrendUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                                    Sales Trend
                                </h5>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="d-flex align-items-center gap-1"
                                    style={{ borderColor: "var(--color-border)" }}
                                >
                                    <FaDownload />
                                    Export
                                </Button>
                            </div>
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border" style={{ color: "var(--color-primary)" }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={350}>
                                    <ComposedChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="colorRevenueNew" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="Renew" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F44336" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#F44336" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="Account" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#674EA7" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#674EA7" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="Keyaccount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F1C232" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#F1C232" stopOpacity={0.1} />
                                            </linearGradient>

                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                                        <XAxis
                                            dataKey="monthLabel"
                                            stroke="var(--color-muted-foreground)"
                                            style={{ fontSize: "0.875rem" }}
                                        />
                                        <YAxis
                                            tickFormatter={(value) => value.toLocaleString("th-TH")}
                                            width={90}
                                            stroke="var(--color-muted-foreground)"
                                            style={{ fontSize: "0.875rem" }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                border: "1px solid var(--color-border)",
                                                borderRadius: "0.5rem",
                                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            }}
                                            formatter={(value) =>
                                                `฿${Number(value).toLocaleString("th-TH", { minimumFractionDigits: 2 })}`
                                            }
                                            labelFormatter={(label) => `Month: ${label}`}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: "1rem" }} iconType="circle" />

                                        <Bar
                                            type="monotone"
                                            dataKey="revenueNew"
                                            fill="#10b981"
                                            name="New"
                                            stackId="a"
                                        />
                                        <Bar
                                            type="monotone"
                                            dataKey="revenueRenew"
                                            fill="#F44336"
                                            name="Renew"
                                            stackId="a"
                                        />
                                        <Bar
                                            type="monotone"
                                            dataKey="revenueAccount"
                                            fill="#674EA7"
                                            name="Account"
                                            stackId="a"
                                        />
                                        <Bar
                                            type="monotone"
                                            dataKey="revenueKeyAccount"
                                            fill="#F1C232"
                                            name="KeyAccount"
                                            stackId="a"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            fill="url(#colorRevenue)"
                                            name="TotalRevenue"
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Product Distribution Chart */}
                <Col lg={4}>
                    <Card className="h-100 border-0 shadow-sm bg-body">
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0 fw-semibold text-body">
                                    Product Distribution
                                </h5>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={filteredProducts.map(p => ({
                                                    ...p,
                                                    color: PRODUCT_COLORS_BOOTSTRAP[p.product] || "var(--bs-secondary)"
                                                }))}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                dataKey="revenue"
                                                nameKey="product"
                                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                            >
                                                {filteredProducts.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            PRODUCT_COLORS_BOOTSTRAP[entry.product] ||
                                                            "var(--bs-secondary)"
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    background: "var(--bs-body-bg)",
                                                    border: "1px solid var(--bs-border-color)",
                                                    borderRadius: "0.5rem",
                                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                }}
                                                formatter={(value) =>
                                                    `฿${Number(value).toLocaleString("th-TH", {
                                                        minimumFractionDigits: 2,
                                                    })}`
                                                }
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>

                                    <div className="mt-3">
                                        {filteredProducts.map((product, idx) => (
                                            <div
                                                key={idx}
                                                className="d-flex align-items-center justify-content-between mb-2 p-2 rounded bg-light-subtle"
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    <div
                                                        style={{
                                                            width: "12px",
                                                            height: "12px",
                                                            borderRadius: "50%",
                                                            background:
                                                                PRODUCT_COLORS_BOOTSTRAP[product.product] ||
                                                                "var(--bs-secondary)",
                                                        }}
                                                    />
                                                    <span className="small fw-medium text-body">
                                                        {product.product}
                                                    </span>
                                                </div>
                                                <Badge
                                                    className="px-2 py-1 text-uppercase"
                                                    style={{
                                                        background:
                                                            PRODUCT_COLORS_BOOTSTRAP[product.product] ||
                                                            "var(--bs-secondary)",
                                                    }}
                                                >
                                                    {product.deals}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    No product data for selected filters
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            {/* Sales Details Table */}
            <Card className="border-0 shadow-sm" style={{ background: "var(--color-card)" }}>
                <Card.Body className="p-4">
                    <h5 className="mb-4 fw-semibold" style={{ color: "var(--color-foreground)" }}>
                        Sales Details
                    </h5>
                    <div className="table-responsive">
                        <Table hover className="mb-0">
                            <thead
                                style={{ background: "var(--color-muted)", borderBottom: "2px solid var(--color-border)" }}
                            >
                                <tr>
                                    <th className="py-3 px-4" style={{ color: "var(--color-muted-foreground)", fontWeight: 600 }}>
                                        Month
                                    </th>
                                    <th className="py-3 px-4" style={{ color: "var(--color-muted-foreground)", fontWeight: 600 }}>
                                        Year
                                    </th>
                                    <th
                                        className="py-3 px-4 text-end"
                                        style={{ color: "var(--color-muted-foreground)", fontWeight: 600 }}
                                    >
                                        Revenue (฿)
                                    </th>
                                    <th
                                        className="py-3 px-4 text-end"
                                        style={{ color: "var(--color-muted-foreground)", fontWeight: 600 }}
                                    >
                                        Deals
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((s, idx) => (
                                        <tr key={idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                            <td className="py-3 px-4" style={{ color: "var(--color-foreground)" }}>
                                                <Badge
                                                    bg="primary"
                                                    className="px-3 py-2"
                                                    style={{ background: "var(--color-primary)" }}
                                                >
                                                    {getMonthAbbr(s.month_no)}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4" style={{ color: "var(--color-foreground)" }}>
                                                {s.year_no}
                                            </td>
                                            <td
                                                className="py-3 px-4 text-end fw-semibold"
                                                style={{ color: "var(--color-foreground)" }}
                                            >
                                                ฿{(s.revenue || 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="py-3 px-4 text-end fw-semibold" style={{ color: "var(--color-success)" }}>
                                                {s.deal || 0}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-5"
                                            style={{ color: "var(--color-muted-foreground)" }}
                                        >
                                            {loading ? "Loading data..." : "No data for selected filter"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}