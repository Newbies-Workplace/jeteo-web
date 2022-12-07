import React from "react";
import styles from "./EventTags.module.scss";

interface EventTagsProps {
  tags: string[],
}

const EventTags: React.FC<EventTagsProps> = ({
  tags
}) => {
  console.log(tags)
  const tag = tags.map(el => 
    <span>{el}</span>
  )
  console.log(tag)
  return (

    <div className={styles.tagsWrapper}>
      {tag}
    </div>

)};
export default EventTags;

