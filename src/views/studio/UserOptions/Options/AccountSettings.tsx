import React from 'react'
import Button from '../../../../components/ui/Button/Button'
import { Input } from '../../../../components/ui/Input/Input'
import styles from './AccountSettings.module.scss'




export const AccountSettings: React.FC = () => {
  return (
    <div className={styles.accountSettingsContainer}>
        <h1 className={styles.accountSettingsTitle}>Opcje</h1>
        <Input label='Nickname' required placeholder='John' className={styles.accuntSettingsInput}/>
        <Input label='Telefon' placeholder='123 456 789'/>
        <Input label='GitHub' placeholder='https://github.com/example'/>
        <Input label='Poczta' placeholder='example@mail.com'/>
        <Input label='Twitter' placeholder='https://twitter.com/example'/>
        <Input label='Linkedin' placeholder='https://www.linkedin.com/in/example'/>
        <Button primary type='submit' className={styles.accountSaveBtn}>Zapisz</Button>
    </div>
  )
}