import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { NavBar } from '../../components/ui/NavBar/NavBar'
import { NavButton } from '../../components/ui/NavButton/NavButton'
import PersonalizationIcon from '../../assets/icons/PersonalizationIcon.svg'
import styles from './SettingsView.module.scss'
import { PersonalizationView } from './personalization/PersonalizationView'

export const SettingsView: React.FC = () => {
    return (
        <>
            <div className={styles.backgroundContainer}>
                <NavBar withBackground/>
                <div className={styles.userOptionsMainContainer}>
                    <div className={styles.userOptionsNavigation}>
                        <h1 className={styles.logo}>Ustawienia</h1>

                        <NavButton
                            icon={<PersonalizationIcon height={"30px"}/>}
                            name={"Personalizacja"}
                            to={"personalization"}
                        />
                    </div>

                    <div className={styles.separator} />

                    <div className={styles.content}>
                        <Routes>
                            <Route
                                element={<PersonalizationView/>}
                                path="/personalization"
                            />
                            <Route
                                element={<Navigate to={"personalization"} />}
                                path="/*"
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}