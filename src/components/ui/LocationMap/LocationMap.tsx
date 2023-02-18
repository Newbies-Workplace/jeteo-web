import React, { useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from "./LocationMap.module.scss";
import CloseIcon from "../../../assets/icons/close.svg";
import ZoomIcon from "../../../assets/icons/zoom-glass.svg";
import PinIcon from "../../../assets/icons/pin.svg"
import { MarkerLayer, Marker } from "react-leaflet-marker";
import {useScrollBlockHook} from "../../../contexts/auth/hooks/useScrollBlock.hook";
import {LatLngLiteral} from "leaflet";

interface LocationMapProps {
    coordinates?: {
        lat: number,
        lng: number,
    }
    place: string,
}

export const LocationMap: React.FC<LocationMapProps> = ({coordinates, place}) => {
    const [isBigMapToggled, toggleBigMap] = useState<boolean>(false)

    return (
        <>
            <div className={styles.mapCard}>
                <span className={styles.mapCardTitle}>
                    Lokacja
                </span>

                <span className={styles.mapCardAddress}>
                    {place}
                </span>

                {coordinates &&
                    <MapContainer
                        style={{width: "100%", height: "208px", borderRadius: "16px"}}
                        center={coordinates}
                        zoom={20}
                        zoomControl={false}
                        scrollWheelZoom>

                        <div
                            className={styles.mapContainerOverlay}
                            onDoubleClick={() => toggleBigMap(false)} />

                        <button className={styles.zoomButton} onClick={() => toggleBigMap(!isBigMapToggled)}>
                            <ZoomIcon width={16} height={16}/>
                        </button>

                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                        <MarkerLayer>
                            <Marker position={coordinates} size={[64, 64]} placement={'top'}>
                                <PinIcon/>
                            </Marker>
                        </MarkerLayer>
                    </MapContainer>
                }
            </div>


            {coordinates && isBigMapToggled &&
                <LocationDialog
                    closeDialog={() => toggleBigMap(false)}
                    coordinates={coordinates} />
            }
        </>
    )
}

interface LocationDialogProps {
    closeDialog: () => void
    coordinates: LatLngLiteral
}

const LocationDialog: React.FC<LocationDialogProps> = ({closeDialog, coordinates}) => {
    useScrollBlockHook()

    return (
        <>
            <div
                className={styles.mapBigDisplayOverlay}
                onClick={() => closeDialog()}
            />

            <div className={styles.mapBigDisplay} style={{display: "block"}}>
                <MapContainer
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 16,
                    }}
                    center={coordinates}
                    zoom={20}
                    zoomControl={false}
                    scrollWheelZoom>

                    <div
                        className={styles.mapContainerOverlay}
                        onDoubleClick={() => closeDialog()}
                    />

                    <button className={styles.zoomButton} onClick={() => closeDialog()}>
                        <CloseIcon width={16} height={16}/>
                    </button>

                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                    <MarkerLayer>
                        <Marker position={coordinates} size={[64, 64]} placement={'top'}>
                            <PinIcon/>
                        </Marker>
                    </MarkerLayer>
                </MapContainer>
            </div>
        </>
    )
}
