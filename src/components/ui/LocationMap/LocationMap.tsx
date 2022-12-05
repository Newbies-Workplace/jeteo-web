import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import styles from "./LocationMap.module.scss";

interface LocationMapProps {
    latitude: number,
    longitude: number,
    address?: string
}

const markerIcon = new L.Icon({
    iconUrl: "../../../assets/icons/pin.svg",
    iconSize: [64,64],
    iconAnchor: [30,45]
})

export const LocationMap: React.FC<LocationMapProps> = ({latitude, longitude, address}) => {
    return (
        <div className={styles.mapCard}>
            <span className={styles.mapCardTitle}>Lokacja</span>
            { address && <span className={styles.mapCardAddress}>{ address }</span>}

            <MapContainer style={{width: "100%", height: "208px", borderRadius: "16px"}} center={{
                lat: latitude,
                lng: longitude
            }} zoom={20} zoomControl={false} scrollWheelZoom>

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[latitude, longitude]} icon={markerIcon}>
                <Popup>
                    Lokalizacja prelekcji
                </Popup>
            </Marker>

            </MapContainer>
        </div>
    )
}
