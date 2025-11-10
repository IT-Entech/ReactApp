import { useState, useEffect} from "react";

export function useWasteData(showAddModal) {
    const [wasteOptions, setWasteOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showAddModal) {
            setLoading(true);
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            fetch(`${API_BASE_URL}/api/Waste`) 
                .then((res) => res.json())
                .then((data) => {
                    const formatted = data.wastes.map((w) => ({
                        value: w.waste_name,
                        label: w.waste_name,
                    }));
                    setWasteOptions(formatted);
                })
                .catch((err) => console.error("Error fetching wastes:", err));
        }
    }, [showAddModal]);



    return { wasteOptions, loading };
}
