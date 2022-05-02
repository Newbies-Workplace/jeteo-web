import React from "react";
import {StudioNavButton} from "../StudioNavButton/StudioNavButton";
import Dashboard from "../../../assets/images/icons/dashboard.svg";
import Calendar from "../../../assets/images/icons/calendar.svg";
import styles from './StudioNav.module.scss';

export const StudioNav: React.FC = () => {
  return (
      <div className={styles.navigation}>
          <h1 className={styles.logo}>STUDIO</h1>

          <StudioNavButton
              icon={<Dashboard width={20}/>}
              name={"Dashboard"}
              to={"dashboard"}/>

          <StudioNavButton
              icon={<Calendar width={20}/>}
              name={"Wydarzenia"}
              to={"events"}/>
      </div>
  )
}