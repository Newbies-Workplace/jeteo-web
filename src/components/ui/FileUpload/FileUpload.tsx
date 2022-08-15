import React, {useRef, useState} from "react";
import styles from "./FileUpload.module.scss"
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import cs from "classnames";
import Help from "../../../assets/vectors/help.svg"
import {ALLOWED_IMAGE_EXTENSIONS} from "../../../common/utils/constants";

interface FileUploadProps {
    accept?: string
    onChange: (files: FileList) => void
    hint?: string | null
}

const FileUpload: React.FC<FileUploadProps> = ({accept = ALLOWED_IMAGE_EXTENSIONS.join(', '), onChange, hint = accept}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDraggingFile, setDraggingFile] = useState(false)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDraggingFile(true)
        } else if (e.type === "dragleave") {
            setDraggingFile(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDraggingFile(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onChange(e.dataTransfer.files)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files)
        }
    }

    return (
        <div
            className={cs(
                styles.container,
                {[styles.hovering]: isDraggingFile}
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}>

            {hint &&
                <div className={styles.hint}>
                    <Help className={styles.hintIcon} />
                    <span className={styles.hintText}>
                        {hint}
                    </span>
                </div>
            }

            <span className={styles.text}>
                Przeciągnij plik tutaj lub
            </span>

            <input
                ref={inputRef}
                type={'file'}
                className={styles.input}
                accept={accept}
                onChange={handleChange} />

            <PrimaryButton size={'small'} onClick={() => inputRef?.current?.click()}>
                Wybierz
            </PrimaryButton>
        </div>
    )
}

export default FileUpload