import { useEffect, useRef, useState } from "react";

const ORIGIN = { lat: 13.562044, lng: 100.653795 };
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";

export default function MyGoogleMap({ onDistanceCalculated }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [destination, setDestination] = useState(null);

    // ✅ โหลด Google Maps Script และสร้างแผนที่
    useEffect(() => {
        if (window.google) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }&libraries=marker`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
        }

        function initMap() {
            if (!mapRef.current) return;

            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: ORIGIN,
                zoom: 9,
                mapId: MAP_ID || undefined,
            });

            // ✅ ปักหมุดต้นทาง
            new window.google.maps.marker.AdvancedMarkerElement({
                map: mapInstance,
                position: ORIGIN,
                title: "จุดเริ่มต้น (Origin)",
            });

            // ✅ คลิกเพื่อปักหมุดปลายทาง
            mapInstance.addListener("click", (e) => {
                const pos = e.latLng.toJSON();
                setDestination(pos);

                if (markerRef.current) markerRef.current.map = null;

                const advMarker = new window.google.maps.marker.AdvancedMarkerElement({
                    map: mapInstance,
                    position: pos,
                    title: "จุดปลายทาง (Destination)",
                });
                markerRef.current = advMarker;
            });

            setMap(mapInstance);
        }
    }, []);

    // ✅ คำนวณระยะทางแบบ “ไป–กลับ”
    useEffect(() => {
        if (!destination || !window.google) return;

        const service = new window.google.maps.DistanceMatrixService();

        // 👉 เริ่มจาก “ไป” (Origin → Destination)
        service.getDistanceMatrix(
            {
                origins: [ORIGIN],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response1, status1) => {
                if (status1 === "OK" && response1.rows[0].elements[0].status === "OK") {
                    const goElement = response1.rows[0].elements[0];
                    const goDistance = goElement.distance.value / 1000;
                    const goDuration = goElement.duration.text;

                    // 👉 ต่อด้วย “กลับ” (Destination → Origin)
                    service.getDistanceMatrix(
                        {
                            origins: [destination],
                            destinations: [ORIGIN],
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        },
                        (response2, status2) => {
                            if (status2 === "OK" && response2.rows[0].elements[0].status === "OK") {
                                const backElement = response2.rows[0].elements[0];
                                const backDistance = backElement.distance.value / 1000;
                                const backDuration = backElement.duration.text;

                                // ✅ รวมผลลัพธ์ “ไป–กลับ”
                                const totalDistance = goDistance + backDistance;

                                onDistanceCalculated({
                                    distanceText: `${totalDistance.toFixed(2)} กม.`,
                                    distanceValue: totalDistance,
                                    durationText: `ขาไป ${goDuration} / ขากลับ ${backDuration}`,
                                    goDistance,
                                    backDistance,
                                    destination,
                                });
                            }
                        }
                    );
                }
            }
        );
    }, [destination, onDistanceCalculated]);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "500px", borderRadius: "10px" }}
        />
    );
}
