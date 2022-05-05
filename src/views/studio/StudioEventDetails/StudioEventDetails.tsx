import React from "react";
import {useParams} from "react-router-dom";
import styles from "./StudioEventDetails.module.scss"
import {StudioToolbar} from "../StudioToolbar/StudioToolbar";

export const StudioEventDetails: React.FC = () => {
    const { name } = useParams<{name: string}>();

    return (
        <div className={styles.container}>
            <StudioToolbar title={"bruh momentoa"} onBackPress={() => {

            }}/>

            Event details {name}
        </div>
    )
}