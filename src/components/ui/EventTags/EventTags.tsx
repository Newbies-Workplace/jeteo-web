import React from "react";
import styles from "./EventTags.module.scss";
import cs from "classnames";

interface EventTagsProps {
  tags: string[],
  size?: 'normal' | 'small';
}

const EventTags: React.FC<EventTagsProps> = (
    {
      tags,
      size= 'normal'
    }
) => {
  return (
      <div className={styles.tagsWrapper}>
        {tags.map(el =>
            <span
                className={cs(
                    styles.tag,
                    {
                      [styles.small]: size === 'small',
                    }
                )}
                key={el}>
              {el}
            </span>
        )}
      </div>
  )};

export default EventTags;
