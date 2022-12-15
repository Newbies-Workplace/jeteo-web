import React, { useState } from "react";
import styles from "./StarRating.module.scss";
import StarIcon from "../../../assets/icons/starIcon.svg";
import cs from 'classnames'

interface starRatingProps {
  max?: number;
  value: number;
  title?: string;
  width?: string;
  height?: string;
  className?: string;
  setValue: (value: number) => void;
}

const StarRating: React.FC<starRatingProps> = ({
  max = 5,
  setValue,
  value,
  className,
  title,
  width = "30px",
  height = "30px",
}) => {
  const [highlited, setHighlited] = useState<number | undefined>();

  return (
    <div
      className={styles.starIconContainer}
      onMouseLeave={() => setHighlited(undefined)}
    >
      {title !== undefined && <h3 className={cs(styles.starRatingTitle, className)}>{title}</h3>}
      <div>
      {[...Array(max)].map((el, index) => {
        const isHiglited = highlited !== undefined ? highlited : value;
        const fill = index <= isHiglited ? "#FFD700" : "transparent";
        return (
          <StarIcon
            key={index}
            className={styles.starIcon}
            fill={fill}
            width={width}
            height={height} 
            onClick={() => setValue(index)}
            onMouseEnter={() => setHighlited(index)}
          />
        );
      })}
      </div>
    </div>
  );
};


export default StarRating;
