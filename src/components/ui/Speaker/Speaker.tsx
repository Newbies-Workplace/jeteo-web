import React from "react";
import styles from './Speaker.module.scss'

interface SpeakerProps {
  name?: string;
  title?: string;
  description?: string;
  icon: string;
}

const Speaker: React.FC<SpeakerProps> = ({
  name,
  title,
  description,
  icon,
}) => {
  return (
    <div>
      <div >
        <h4>{name}</h4>
        <div>
          <a href="#">ok1</a>
          <a href="#">ok2</a>
          <a href="#">ok3</a>
        </div>
        <div >
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default Speaker;