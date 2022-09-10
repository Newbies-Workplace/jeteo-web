import React, { useState } from "react";

import styles from "./MapPicker.module.scss";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import 'leaflet/dist/leaflet.css'

export const MapMarker: React.FC = () => {
    const [coords, setCoords] = useState<LatLng | null>(null);

    const map = useMapEvents({
        click(e) {
          map.locate();
          setCoords(e.latlng);
          console.log(e);
        },
    });

    return coords === null ? null : (
        <Marker position={coords}>
            <Popup>
                You are here
            </Popup>
        </Marker>
    );
};

export const MapPicker: React.FC = () => {
    return (
        <div className={styles.mapDiv}>
            <MapContainer style={{width: "500px", height: "250px"}} center={{
                lat: 50,
                lng: 16
            }} zoom={13} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapMarker />
            </MapContainer>
        </div>
    );
};