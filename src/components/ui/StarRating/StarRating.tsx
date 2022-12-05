import React from "react";
import styles from "./StarRating.module.scss";
import StarIcon from "../../../assets/icons/starIcon.svg";
interface starRatingProps {
  starLenght?: number;
  value: number;
  setValue: (value: number) => void;
}


const StarRating: React.FC<starRatingProps> = ({
  starLenght = 5,
  setValue,
  value,
}) => {
  return (
    <div className={styles.starIconContainer}>
      {[...Array(starLenght)].map((el, index) => {
        const fill = index <= value ? "#FFD700" : "transparent";
        return (
          <StarIcon
            className={styles.starIcon}
            fill={fill}
            onClick={() => setValue(index)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
