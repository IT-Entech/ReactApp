import { useState, useEffect, useMemo } from "react";

export function useSalesData({ yearFilter, monthFilter, channelFilter, selectedStaff }) {
    const [sales, setSales] = useState([]);
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
        fetch(`${API_BASE_URL}/api/DBSales`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Year: yearFilter,
                Month: monthFilter === "00" ? null : monthFilter,
                StaffId: selectedStaff === "all" ? null : selectedStaff,
                Channel: channelFilter === "N" ? null : channelFilter,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setSales(result.sales || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [yearFilter, monthFilter, selectedStaff, channelFilter]);

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
    const filteredSalesRaw = useMemo(() => {
        return (sales || []).filter(
            (s) =>
                s.year_no === yearFilter &&
                (monthFilter === "00" || String(s.month_no).padStart(2, "0") === monthFilter) &&
                (channelFilter === "N" || s.channel === channelFilter) &&
                (selectedStaff === "all" || s.staff_id === selectedStaff)
        );
    }, [sales, yearFilter, monthFilter, selectedStaff, channelFilter]);

    // 🔹 จัดข้อมูลสำหรับ chart
    const chartData = useMemo(() => {
        const monthsInYear = Array.from({ length: 12 }, (_, i) => i + 1);
        if (channelFilter === "N" && selectedStaff === "all") {
            const map = {};
            filteredSalesRaw.forEach((sale) => {
                const key = `${sale.year_no}-${sale.month_no}`;
                if (!map[key]) map[key] = { ...sale, revenue: 0, revenueNew: 0, revenueRenew: 0, revenueAccount: 0, revenueKeyAccount: 0 };
                map[key].revenue += sale.revenue;
                map[key].revenueNew += sale.revenueNew;
                map[key].revenueRenew += sale.revenueRenew;
                map[key].revenueAccount += sale.revenueAccount;
                map[key].revenueKeyAccount += sale.revenueKeyAccount;
            });
            return Object.values(map)
                .sort((a, b) => a.year_no - b.year_no || a.month_no - b.month_no)
                .map((s) => ({ ...s, monthLabel: getMonthAbbr(s.month_no) }));
        } else {
            const monthMap = {};
            monthsInYear.forEach((m) => (monthMap[m] = { month_no: m, revenue: 0, revenueNew: 0, revenueRenew: 0, revenueAccount: 0, revenueKeyAccount: 0 }));

            filteredSalesRaw.forEach((sale) => {
                if (!monthMap[sale.month_no]) {
                    monthMap[sale.month_no] = { month_no: sale.month_no, revenue: 0, revenueNew: 0, revenueRenew: 0, revenueAccount: 0, revenueKeyAccount: 0 };
                }
                monthMap[sale.month_no].revenue += sale.revenue || 0;
                monthMap[sale.month_no].revenueNew += sale.revenueNew || 0;
                monthMap[sale.month_no].revenueRenew += sale.revenueRenew || 0;
                monthMap[sale.month_no].revenueAccount += sale.revenueAccount || 0;
                monthMap[sale.month_no].revenueKeyAccount += sale.revenueKeyAccount || 0;
            });

            return monthsInYear.map((m) => ({
                ...monthMap[m],
                monthLabel: getMonthAbbr(m),
            }));
        }
    }, [filteredSalesRaw, channelFilter, selectedStaff]);

    // 🔹 รวมค่ารวม
    const tableData = channelFilter === "N" && selectedStaff === "all" ? chartData : filteredSalesRaw;
    const totalRevenue = tableData.reduce((sum, s) => sum + (s.revenue || 0), 0);
    const totalDeals = tableData.reduce((sum, s) => sum + (s.deal || 0), 0);
    const years = [...new Set(sales.map((s) => s.year_no))].sort((a, b) => a - b);

    // 🔹 สรุปสินค้า
    const filteredProducts = useMemo(() => {
        const filteredSales = sales.filter(
            (s) =>
                s.year_no === yearFilter &&
                (monthFilter === "00" || String(s.month_no).padStart(2, "0") === monthFilter) &&
                (channelFilter === "N" || s.channel === channelFilter) &&
                (selectedStaff === "all" || s.staff_id === selectedStaff)
        );

        const productMap = {};
        filteredSales.forEach((sale) => {
            const productName = sale.product || "Unknown";
            if (!productMap[productName]) productMap[productName] = { product: productName, revenue: 0, deals: 0 };
            productMap[productName].revenue += sale.revenue || 0;
            productMap[productName].deals += sale.deal || 0;
        });

        const productArray = Object.values(productMap);
        const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
        return productArray.map((p, idx) => ({ ...p, color: colors[idx % colors.length] }));
    }, [sales, yearFilter, monthFilter, channelFilter, selectedStaff]);

    return {
        sales,
        staffFilter,
        chartData,
        tableData,
        totalRevenue,
        totalDeals,
        filteredProducts,
        years,
        loading,
        getMonthAbbr
    };
}
