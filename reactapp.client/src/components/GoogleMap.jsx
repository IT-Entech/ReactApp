import { useEffect, useRef, useState } from "react";

const ORIGIN = { lat: 13.562044, lng: 100.653795 };
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";

export default function MyGoogleMap({ onDistanceCalculated }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        if (window.google) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY
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

            new window.google.maps.marker.AdvancedMarkerElement({
                map: mapInstance,
                position: ORIGIN,
                title: "จุดเริ่มต้น (Origin)",
            });

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

    useEffect(() => {
        if (!destination || !window.google) return;

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [ORIGIN],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === "OK" && response.rows[0].elements[0].status === "OK") {
                    const el = response.rows[0].elements[0];
                    onDistanceCalculated({
                        distanceText: el.distance.text,
                        distanceValue: el.distance.value / 1000,
                        durationText: el.duration.text,
                        destination,
                    });
                }
            }
        );
    }, [destination, onDistanceCalculated]);

    return <div ref={mapRef} style={{ width: "100%", height: "500px", borderRadius: "10px" }} />;
}
