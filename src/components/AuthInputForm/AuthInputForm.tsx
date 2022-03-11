import React from "react";

import styles from "./AuthInputForm.css";

export const AuthInputForm: React.FC = () => {
    return <input placeholder="np. AnonimowyRosomak" className={styles.input} />;
};

export default AuthInputForm;