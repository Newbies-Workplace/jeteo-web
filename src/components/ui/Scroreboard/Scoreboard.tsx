import React from "react"
import styles from "./Scoreboard.module.scss"
import cs from "classnames";

interface ScoreboardProps {
    userPoints: {
        name: string
        points: number
    }[]
}

export const Scoreboard: React.FC<ScoreboardProps> = ({userPoints}) => {
    return (
        <div className={styles.container}>
            Tablica wyników 🥇

            {userPoints.sort((a, b) => {
                return b.points - a.points
            }).map((value, index) => {
                return (
                    <div
                        key={value.name}
                         className={cs(styles.userPoints, {
                             [styles.first]: index === 0,
                             [styles.second]: index === 1,
                             [styles.third]: index === 2,
                         })}>

                        <span className={styles.name}>
                            {index <= 2 && (
                                <div className={cs(styles.dot, {
                                    [styles.first]: index === 0,
                                    [styles.second]: index === 1,
                                    [styles.third]: index === 2,
                                })}/>
                            )}

                            {value.name}
                        </span>

                        <span>
                            {value.points} pkt.
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
