import React, {useState} from 'react'
import FileUpload from '../../../components/ui/FileUpload/FileUpload'
import styles from './PersonalizationView.module.scss'
import studioFormStyles from "./../../../common/styles/StudioFormStyles.module.scss";
import formStyles from "../../../components/form/Form.module.scss"
import {updateProfilePic} from "../../../api/rest/user/User";
import {toast} from 'react-toastify';
import {useAuth} from '../../../contexts/auth/hooks/useAuth.hook';
import {Input} from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import {CoreUserResponseFragment, useReplaceMyUserMutation, UserRequestInput, useUserQuery} from '../../../api/graphql';
import {StudioSection} from "../../../components/ui/StudioSection/StudioSection";
import {Controller, useForm} from "react-hook-form";
import {AxiosInstance} from "axios";

export const PersonalizationView: React.FC = () => {
    const { axios, user } = useAuth()
    const [userData, setUserData] = useState<CoreUserResponseFragment | undefined>()

    const { loading, error } = useUserQuery({
        variables: {
            id: user!.id
        },
        onCompleted: (data) => {
            setUserData(data.user!)
        }
    })

    if (loading || !userData) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error... {error}</div>
    }

    return (
        <PersonalizationForm
            userData={userData}
            setUserData={setUserData}
            axios={axios}/>
    )
}

interface FormViewProps {
    userData: CoreUserResponseFragment
    setUserData: (value: CoreUserResponseFragment) => void
    axios: AxiosInstance
}

const PersonalizationForm: React.FC<FormViewProps> = ({userData, setUserData, axios}) => {
    const initialValues: UserFormValues = {
        nickname: userData.nickname,
        description: userData.description,
        contact: {
            github: userData.contact.github,
            twitter: userData.contact.twitter,
            mail: userData.contact.mail,
            linkedin: userData.contact.linkedin,
        }
    }

    const [replaceMyUser] = useReplaceMyUserMutation()
    const {control, handleSubmit} = useForm<UserFormValues>({defaultValues: initialValues})

    const onProfilePicUpdate = async (file: File) => {
        updateProfilePic(axios, file)
            .then((res) => {
                setUserData({ ...userData!, avatar: res.url })
            })
            .catch(() => toast.error("Wystąpił błąd podczas przesyłania zdjęcia profilowego"))
    }

    const onSubmitClicked = (values: UserFormValues) => {
        const request: UserRequestInput = {
            nickname: values.nickname,
            description: values.description,
            contact: {
                mail: values.contact.mail,
                twitter: values.contact.twitter,
                github: values.contact.github,
                linkedin: values.contact.linkedin,
            }
        }

        replaceMyUser({
            variables: {
                request: request,
            }
        })
            .then((res) => res.data ?? Promise.reject("no data"))
            .then((data) => data.replaceMyUser)
            .then((submittedUser: CoreUserResponseFragment) => {
                setUserData(submittedUser)

                toast.success("Użytkownika aktualizowano")
            })
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <form onSubmit={handleSubmit(onSubmitClicked)}>
            <div className={studioFormStyles.container}>
                <div className={studioFormStyles.innerContainer}>
                    <StudioSection title={"Zdjęcie profilowe"}>
                        <div className={styles.profileSection}>
                            <img
                                src={userData?.avatar}
                                alt="Zdjęcie profilowe"
                                className={styles.avatar}/>

                            <FileUpload onChange={(files) => onProfilePicUpdate(files[0])} />
                        </div>
                    </StudioSection>

                    <StudioSection title={"Dane podstawowe"}>
                        <Controller
                            name={'nickname'}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label='Nazwa'
                                    value={field.value}
                                    setValue={value => field.onChange(value)}
                                    required />
                            } />

                        <Controller
                            name={'description'}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label='Opis profilu'
                                    multiline
                                    className={styles.description}
                                    value={field.value ?? ''}
                                    setValue={value => field.onChange(value)}/>
                            } />
                    </StudioSection>

                    <StudioSection title={"Dane kontaktowe (widoczne publicznie)"}>
                        <Controller
                            name={'contact.mail'}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label='Poczta'
                                    placeholder='example@mail.com'
                                    value={field.value ?? ''}
                                    setValue={value => field.onChange(value)}/>
                            } />
                        <Controller
                            name={'contact.linkedin'}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label='Linkedin'
                                    placeholder='https://www.linkedin.com/in/example'
                                    value={field.value ?? ''}
                                    setValue={value => field.onChange(value)}/>
                            } />
                        <Controller
                            name={'contact.twitter'}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label='Twitter'
                                    placeholder='https://twitter.com/example'
                                    value={field.value ?? ''}
                                    setValue={value => field.onChange(value)}/>
                            } />
                        <Controller
                            name={'contact.github'}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label='GitHub'
                                    placeholder='https://github.com/example'
                                    value={field.value ?? ''}
                                    setValue={value => field.onChange(value)}/>
                            } />
                    </StudioSection>

                    <div className={formStyles.submit}>
                        <Button primary type='submit'>Zapisz</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

interface UserFormValues {
    nickname: string
    description?: string
    contact: {
        github?: string
        linkedin?: string
        mail?: string
        twitter?: string
    }
}