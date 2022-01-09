import { FC } from "react";

import SocialMedia from "../../types/socialMedia";

import styles from "./styles.css";

interface Props {
    socialMedia: SocialMedia;
    onClick: () => void;
}

export const SignInWithSocialMediaButton: FC<Props> = function({ socialMedia, onClick }) {
    return (
        <div onClick={onClick} className={styles.provider}>
            {socialMedia}
        </div>
    );
};

export default SignInWithSocialMediaButton;