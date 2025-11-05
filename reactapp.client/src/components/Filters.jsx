import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

export default function Filters({
    filters,
    yearFilter,
    setYearFilter,
    monthFilter,
    setMonthFilter,
    channelFilter,
    setChannelFilter,
    selectedStaff,
    setSelectedStaff,
    staffFilter = [],
    years = [],
    loading = false,
}) {
    const channels = [
        { label: "All", value: "N" },
        { label: "Online", value: "I" },
        { label: "Offline", value: "O" },
    ];

    const months = [
        { label: "All Months", value: "00" },
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];

    return (
     

                <Row className="g-3">
            {/* Year */}
            {filters.includes("year") && (
                <Col md={3}>
                    <Form.Label
                        className="fw-medium small"
                        style={{ color: "var(--color-muted-foreground)" }}
                    >
                        Year
                    </Form.Label>
                    <Form.Select
                        value={String(yearFilter)}
                        onChange={(e) => setYearFilter(Number(e.target.value))}
                        className="shadow-sm"
                        style={{
                            background: "var(--color-background)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-foreground)",
                        }}
                        disabled={loading}
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            )}
            {/* Month */}
            {filters.includes("month") && (
                <Col md={3}>
                    <Form.Label
                        className="fw-medium small"
                        style={{ color: "var(--color-muted-foreground)" }}
                    >
                        Month
                    </Form.Label>
                    <Form.Select
                        value={monthFilter}
                        onChange={(e) => setMonthFilter(e.target.value)}
                        className="shadow-sm"
                        style={{
                            background: "var(--color-background)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-foreground)",
                        }}
                        disabled={loading}
                    >
                        {months.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            )}

            {/* Channel */}
            {filters.includes("channel") && (
                <Col md={3}>
                    <Form.Label
                        className="fw-medium small"
                        style={{ color: "var(--color-muted-foreground)" }}
                    >
                        Channel
                    </Form.Label>
                    <Form.Select
                        value={channelFilter}
                        onChange={(e) => setChannelFilter(e.target.value)}
                        className="shadow-sm"
                        style={{
                            background: "var(--color-background)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-foreground)",
                        }}
                        disabled={loading}
                    >
                        {channels.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            )}

            {filters.includes("staff") && (
                <Col md={3}>
                    <Form.Label
                        className="fw-medium small"
                        style={{ color: "var(--color-muted-foreground)" }}
                    >
                        Staff
                    </Form.Label>
                    <Form.Select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="shadow-sm"
                        style={{
                            background: "var(--color-background)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-foreground)",
                        }}
                        disabled={loading}
                    >
                        <option value="all">-- Select Staff --</option>
                        {staffFilter.map((s) => (
                            <option key={s.staff_id} value={s.staff_id}>
                                {s.saleName || s.SaleName}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            )}
                </Row>
    );
}
