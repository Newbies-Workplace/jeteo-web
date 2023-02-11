import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { NavBar } from '../../../components/ui/NavBar/NavBar'
import { NavButton } from '../../../components/ui/NavButton/NavButton'
import PersonalizationIcon from '../../../assets/icons/PersonalizationIcon.svg'
import AccountSettingsIcon from "../../../assets/icons/AccountSettingsIcon.svg"

import styles from './UserOptions.module.scss'
import { AccountSettings } from './Options/AccountSettings'
import { AccountPersonalization } from './Options/AccountPersonalization'



export const UserOptions: React.FC = () => {
  return (
    <>
    <div className={styles.backgroundContainer}>
    <NavBar withBackground/>
    <div className={styles.userOptionsMainContainer}>
        <div className={styles.userOptionsNavigation}>
        <h1 className={styles.logo}>Ustawienia</h1>
            <NavButton 
                icon={<AccountSettingsIcon height={"30px"}/>}
                name={"Dane konta"}
                to={"account"}
            />
            <NavButton 
                icon={<PersonalizationIcon height={"30px"}/>}
                name={"Personalizacja"}
                to={"personalization"}
            />
        </div>
        <div className={styles.separator}>

        </div>

        <Routes>
          <Route
            element={<AccountSettings/>}
            path="/account"
          />
          <Route
            element={<AccountPersonalization/>}
            path="/personalization"
          />
          <Route
            element={<Navigate to={"account"} />}
            path="/*"
          />
        </Routes>
    </div>
    </div>
    </>
  )
}