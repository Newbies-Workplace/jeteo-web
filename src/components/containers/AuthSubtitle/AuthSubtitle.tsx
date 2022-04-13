import React from "react";

import styles from "./AuthSubtitle.module.css";

import classNames from "classnames";

interface Props {
    bold?: boolean;
    marginless?: boolean;
}

const AuthSubtitle: React.FC<React.PropsWithChildren<Props>> = ({ children, bold, marginless }) => {
    return (
        <p className={classNames(styles.subtitle, bold ? styles.bold : "", marginless ? styles.marginless : "")}>
            {children}
        </p>
    );
};

export default AuthSubtitle;