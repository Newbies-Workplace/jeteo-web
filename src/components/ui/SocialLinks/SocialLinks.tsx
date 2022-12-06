import React from "react";
import styles from "./SocialLinks.module.scss"

import Mail from "../../../assets/icons/mail.svg";
import Github from "../../../assets/icons/github.svg";
import Twitter from "../../../assets/icons/twitter.svg";
import Linkedin from "../../../assets/icons/linkedin.svg";

interface SocialLinksProps {
    links: {
        githubLink?: string;
        twitterLink?: string;
        emailLink?: string;
        linkedInLink?: string;
    }
}

export const SocialLinks: React.FC<SocialLinksProps> = ({links}) => {
        return (
            <div className={styles.socialLinksWrapper}>
                {links.githubLink && 
                    <a href={links.githubLink}>
                        <Github width={20} height={20}/>
                    </a>
                }

                {links.twitterLink &&
                    <a href={links.twitterLink}>
                        <Twitter width={20} height={20}/>
                    </a>
                }

                {links.emailLink &&
                    <a href={links.emailLink}>
                        <Mail width={20} height={20}/>
                    </a>
                }

                {links.linkedInLink &&
                    <a href={links.linkedInLink}>
                        <Linkedin width={20} height={20}/>
                    </a>
                }
            </div>
        )
}