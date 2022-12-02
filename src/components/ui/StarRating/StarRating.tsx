import React from "react";
import styles from "./StarRating.module.scss";


interface starRatingProps {
    starIcon: React.ReactNode,
    starLenght?: number,
}

const StarRating: React.FC<starRatingProps> = ({ starIcon, starLenght = 5}) => {
    return (
        <p>Witaj</p>
    )
}

export default StarRating;