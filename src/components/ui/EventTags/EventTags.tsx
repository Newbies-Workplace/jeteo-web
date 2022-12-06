import React from "react";
import styles from "./EventTags.module.scss";

interface EventTagsProps {
  tags: string[],
}

const EventTags: React.FC<EventTagsProps> = ({
  tags
}) => {
  const tag = tags.map(el => 
    <div>{el}</div>  
  )
  return (
    
    <div className={styles.tagsWrapper}>
      {tag}
    </div>
)};
export default EventTags;

