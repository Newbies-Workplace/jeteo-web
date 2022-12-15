import React from "react";
import { useAuth } from "../../contexts/auth/hooks/useAuth.hook";
import { EventList } from "../../components/ui/EventList/EventList";
import { NavBar } from "../../components/ui/NavBar/NavBar";
import styles from "./HomeView.module.scss";

export const HomeView: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <NavBar />
      <div className={styles.view}>
        <div className={styles.list}>
          <h1 className={styles.welcomeHeader}>
            {user ? (
              <>
                Witaj, <b>{user.nickname}!</b> 👋
              </>
            ) : (
              `Witaj, użytkowniku! 👋`
            )}
          </h1>
          <h2 className={styles.eventGroup}>Wydarzenia dla ciebie</h2>
          <EventList />
        </div>
      </div>
    </>
  );
};
