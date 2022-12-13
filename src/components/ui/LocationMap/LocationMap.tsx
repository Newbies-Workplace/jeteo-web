import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import styles from "./LocationMap.module.scss";
import ZoomIcon from "../../../assets/icons/zoom-glass.svg";

interface LocationMapProps {
    coordinates?: {
        lat: number,
        lng: number
    }
    address?: string
}

const markerIcon = new Icon({
    iconUrl: "../../../../src/assets/icons/pin.svg",
    iconSize: [64,64],
    iconAnchor: [30,45]
})

export const LocationMap: React.FC<LocationMapProps> = ({coordinates, address}) => {

    const [isBigMapToggled, toggleBigMap] = useState<boolean>(false)

    isBigMapToggled ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'

    return (
        <>
            <div className={styles.mapCard}>
                <span className={styles.mapCardTitle}>Lokacja</span>
                { address && <span className={styles.mapCardAddress}>{ address }</span>}

                { coordinates &&
                    <MapContainer style={{width: "100%", height: "208px", borderRadius: "16px"}} center={coordinates} 
                    zoom={20} zoomControl={false} scrollWheelZoom>

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

                        <Marker position={coordinates} icon={markerIcon}>
                            <Popup offset={[2,9]}>
                                Lokalizacja prelekcji
                            </Popup>
                        </Marker>

                    </MapContainer>
                }
            </div>


            { coordinates && isBigMapToggled &&
                <>
                    <div 
                        className={styles.mapBigDisplayOverlay} 
                        onClick={() => toggleBigMap(!isBigMapToggled)}
                    />

                    <div className={styles.mapBigDisplay} style={{display: "block"}}>

                        <MapContainer style={{width: "100%", height: "100%"}} center={coordinates} zoom={20} zoomControl={false} scrollWheelZoom>

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
        
                            <Marker position={coordinates} icon={markerIcon}>
                                <Popup offset={[2,9]}>
                                    Lokalizacja prelekcji
                                </Popup>
                            </Marker>
        
                        </MapContainer>
        
                    </div>
                </>
            }
        </>
    )
}
