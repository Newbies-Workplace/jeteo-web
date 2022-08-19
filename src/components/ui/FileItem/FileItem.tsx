import React from "react";
import styles from "./FileItem.module.scss"
import Close from "../../../assets/icons/close.svg"

interface FileItemProps {
    url: string,
    onDeleteClick?: () => void
}

const FileItem: React.FC<FileItemProps> = ({url,  onDeleteClick}) => {
  return (
      <div className={styles.item} style={{backgroundImage: `url(${url})`}}>
          {onDeleteClick &&
              <div className={styles.close}>
                  <Close style={{color: 'white'}} onClick={() => onDeleteClick()}/>
              </div>
          }
      </div>
  )
}

export default FileItem