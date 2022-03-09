import { FC } from "react";

import SocialMedia from "../../types/socialMedia";

import styles from "./SignInWithSocialMediaButton.css";

interface Props {
    socialMedia: SocialMedia;
}

export const SignInWithSocialMediaButton: FC<Props> = function({ socialMedia }) {
    return (
        <a href={`${process.env.API_URL}/oauth/login/${socialMedia}`} className={styles.provider}>
            {socialMedia.charAt(0).toUpperCase()}{socialMedia.substring(1)}
        </a>
    );
};

export default SignInWithSocialMediaButton;