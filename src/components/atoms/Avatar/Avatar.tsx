import React from "react";
import styles from "./Avatar.module.scss"
import ProfilePic from "../../../assets/images/default-profile-pic.svg";
import cs from "classnames";

interface AvatarProps {
    url?: string
    className?: string
}

export const Avatar: React.FC<AvatarProps> = ({url, className}) => {
    return (
        <>
            {url
                ? <img className={cs(styles.avatar, className)} src={url} />
                : <ProfilePic className={cs(styles.avatar, className)}/>
            }
        </>
    )
}