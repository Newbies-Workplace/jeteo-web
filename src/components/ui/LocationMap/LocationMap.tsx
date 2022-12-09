import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import styles from "./LocationMap.module.scss";
import ZoomIcon from "../../../assets/icons/zoom-glass.svg";

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

    const [isBigMapToggled, toggleBigMap] = useState<boolean>(false)

    return (
        <div className={styles.mapCard}>
            <span className={styles.mapCardTitle}>Lokacja</span>
            { address && <span className={styles.mapCardAddress}>{ address }</span>}

            <MapContainer style={{width: "100%", height: "208px", borderRadius: "16px"}} center={{
                lat: latitude,
                lng: longitude
            }} zoom={20} zoomControl={false} scrollWheelZoom>

                <div 
                    className={styles.mapContainerOverlay}
                    onDoubleClick={() => toggleBigMap(!isBigMapToggled)}>
                </div>

                <button className={styles.zoomButton} onClick={() => toggleBigMap(!isBigMapToggled)}>
                    <ZoomIcon width={16} height={16}/>
                </button>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[latitude, longitude]} icon={markerIcon}>
                    <Popup>
                        Lokalizacja prelekcji
                    </Popup>
                </Marker>

            </MapContainer>

            {isBigMapToggled &&
                <>
                    <div 
                        className={styles.mapBigDisplayOverlay} 
                        onClick={() => toggleBigMap(!isBigMapToggled)}
                    />

                    <div className={styles.mapBigDisplay} style={{display: "block"}}>

                        <MapContainer style={{width: "100%", height: "100%"}} center={{
                            lat: latitude,
                            lng: longitude
                        }} zoom={20} zoomControl={false} scrollWheelZoom>

                            <div    
                                className={styles.mapContainerOverlay}
                                onDoubleClick={() => toggleBigMap(!isBigMapToggled)}
                            />

                            <button className={styles.zoomButton} onClick={() => toggleBigMap(!isBigMapToggled)}>
                                <ZoomIcon width={16} height={16}/>
                            </button>
        
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
        
                            <Marker position={[latitude, longitude]} icon={markerIcon}>
                                <Popup>
                                    Lokalizacja prelekcji
                                </Popup>
                            </Marker>
        
                        </MapContainer>
        
                    </div>
                </>
            }
        </div>
    )
}
