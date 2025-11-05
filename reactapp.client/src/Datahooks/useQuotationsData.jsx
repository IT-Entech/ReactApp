import { useState, useEffect, useMemo } from "react";

export function useQuotationsData({ yearFilter, monthFilter, selectedStaff }) {
    const [quotations, setQuotations] = useState([]);
    const [staffFilter, setStaffFilter] = useState([]);
    const [loading, setLoading] = useState(false);

    const monthAbbreviations = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        []
    );

    const getMonthAbbr = (month) => monthAbbreviations[Number(month) - 1] || month;

    // 🔹 ดึงข้อมูลยอดขาย
    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        setLoading(true);
        fetch(`${API_BASE_URL}/api/Quotation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Year: yearFilter,
                Month: monthFilter === "00" ? null : monthFilter,
                StaffId: selectedStaff === "all" ? null : selectedStaff,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setQuotations(result.quotations || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [yearFilter, monthFilter, selectedStaff]);

    // 🔹 ดึงข้อมูลพนักงานขาย
    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        setLoading(true);
        fetch(`${API_BASE_URL}/api/Staffs`)
            .then((res) => res.json())
            .then((result) => {
                setStaffFilter(result?.staffdata || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, []);

    // 🔹 ฟิลเตอร์ข้อมูลขาย
    const filteredCustomersRaw = useMemo(() => {
        return (quotations || []).filter(
            (s) =>
                s.year_no === yearFilter &&
                (monthFilter === "00" || String(s.month_no).padStart(2, "0") === monthFilter) &&
                (selectedStaff === "all" || s.staff_id === selectedStaff)
        );
    }, [quotations, yearFilter, monthFilter, selectedStaff]);

    // 🔹 รวมค่ารวม
    const QuotationsData = filteredCustomersRaw;
    const years = [...new Set(quotations.map((s) => s.year_no))].sort((a, b) => a - b);

    return {
        quotations,
        staffFilter,
        QuotationsData,
        years,
        loading,
        getMonthAbbr
    };
}
