import React, { useState } from "react";
import styles from "./StarRating.module.scss";
import StarIcon from "../../../assets/icons/starIcon.svg";
interface starRatingProps {
  max?: number;
  value: number;
  setValue: (value: number) => void;
}

const StarRating: React.FC<starRatingProps> = ({
  max = 5,
  setValue,
  value,
}) => {
  const [highlited, setHighlited] = useState<number | undefined>();

  return (
    <div
      className={styles.starIconContainer}
      onMouseLeave={() => setHighlited(undefined)}
    >
      {[...Array(max)].map((el, index) => {
        const ok = highlited !== undefined ? highlited : value;
        const fill = index <= ok ? "#FFD700" : "transparent";
        return (
          <StarIcon
            key={index}
            className={styles.starIcon}
            fill={fill}
            onClick={() => setValue(index)}
            onMouseEnter={() => setHighlited(index)}
          />
        );
      })}
    </div>
  );
};


export default StarRating;
