import React, { useEffect, useState } from 'react'
import FileUpload from '../../../../components/ui/FileUpload/FileUpload'
import styles from './AccountPersonalization.module.scss'
import { deleteProfilePic, updateProfilePic } from "../../../../api/rest/user/User";
import { toast } from 'react-toastify';
import { useAuth } from '../../../../contexts/auth/hooks/useAuth.hook';
import { Input } from '../../../../components/ui/Input/Input';
import Button from '../../../../components/ui/Button/Button';
import { User } from '../../../../common/models/User';
import { useUserQuery } from '../../../../api/graphql';

export const AccountPersonalization: React.FC = () => {
    const { axios, user } = useAuth()
    const [userData, setUserData] = useState<User | undefined>(undefined)

    const { data, loading, error } = useUserQuery({
        variables: {
            id: user!.id
        },
        onCompleted: (data) => {
            setUserData({ ...user!, avatar: data.user?.avatar })
        }
    })

    if (loading || !data) {
        return <div>Loading...</div>
    }
    if (error) {
        toast.error("Błąd")
    }


    const onProfilePicUpdate = async (file: File) => {
        updateProfilePic(axios, file)
            .then((res) => {
                //This bottom line is to prevent changing state to the same url
                setUserData({ ...user!, avatar: undefined })
                setUserData({ ...user!, avatar: res.url })
                console.log(res.url)
            })
            .catch(() => toast.error("Wystąpił błąd podczas przesyłania zdjęcia profilowego"))
    }



    return (
        <div className={styles.accountPersonalizationContainer}>
            <h1 className={styles.accountPersonalizationTitle}>Opcje</h1>
            <div className={styles.accountPersonalizationContent}>
                <div className={styles.profilePicUpdate}>
                    {user?.avatar && <img src={userData?.avatar} alt="Zdjęcie profilowe" className={styles.accountProfilePic} />}
                    <FileUpload onChange={(files) => onProfilePicUpdate(files[0])} />
                    <Input multiline className={styles.input} label="Opisz swój profil" />
                    <Button primary type='submit'>Zapisz</Button>
                </div>

            </div>
        </div>
    )
}