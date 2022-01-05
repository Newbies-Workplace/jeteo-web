import React from "react";

import SocialMedia from "../../types/socialMedia";

import styles from "./styles.css";

interface Props {
    socialMedia: SocialMedia;
    onClick?: () => void;
}

export const SocialMediaProvider: React.FC<Props> = ({ socialMedia, onClick }) => {
    return (
        <div onClick={onClick} className={styles.provider}>
            {socialMedia}
        </div>
    );
};

export default SocialMediaProvider;