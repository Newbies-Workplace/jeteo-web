import React from "react";
import {NavButton} from "../../../components/atoms/NavButton/NavButton";
import Dashboard from "../../../assets/icons/dashboard.svg";
import Calendar from "../../../assets/icons/calendar.svg";
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  return (
      <div className={styles.navigation}>
          <h1 className={styles.logo}>STUDIO</h1>

          {/*<NavButton*/}
          {/*    icon={<Dashboard width={20}/>}*/}
          {/*    name={"Dashboard"}*/}
          {/*    to={"dashboard"}/>*/}

          <NavButton
              icon={<Calendar width={20}/>}
              name={"Wydarzenia"}
              to={"events"}/>
      </div>
  )
}