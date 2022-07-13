import React, { useState } from "react";
import {Field, Form, Formik, FormikValues} from "formik";
import {StudioSection} from "../../../../components/ui/StudioSection/StudioSection";
import styles from "./StudioEventBasicInfo.module.scss";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import dayjs from "dayjs";
import {useMutation} from "@apollo/client";
import {
    CREATE_EVENT_MUTATION,
    EventMutationData,
    EventMutationVars
} from "../../../../api/graphql/events/EventCreateMutation";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface EventBasicInfoFormProps {
    onSubmitted: (createdId: string) => void
}

//todo validation
export const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({onSubmitted}) => {
    const [createEvent] = useMutation<EventMutationData, EventMutationVars>(CREATE_EVENT_MUTATION);
    const [location, setLocation] = useState<Array<number>>();

    const initialValues: EventCreateValues = {
        startDate: dayjs().format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs().add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: "",
        subtitle: undefined,
        description: undefined,
        address: undefined,
        tags: [],
    }

    const onSubmitClicked = (values: FormikValues) => {
        const request = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            timeFrame: {
                startDate: dayjs(values.startDate).toISOString(),
                finishDate: dayjs(values.finishDate).toISOString(),
            },
            address: undefined,
            tags: [],
        }
        createEvent({
            variables: {
                request: request
            }
        })
            .then((res) => {
                console.log(res)
                onSubmitted(res.data?.createEvent?.id ?? '')
            })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClicked}>
            <Form>
                <StudioSection title={"Co i kiedy?"}>
                    <div className={styles.row}>
                        od
                        <Field type={"datetime-local"} id={"startDate"} name={"startDate"} />
                        do
                        <Field type={"datetime-local"} id={"finishDate"} name={"finishDate"} />
                    </div>

                    <Field id={"title"} name={"title"} placeholder={"Tytuł"}/>
                    <Field id={"subtitle"} name={"subtitle"} placeholder={"Podtytuł (opcjonalny)"}/>
                    <Field id={"description"} name={"description"} placeholder={"Opis (opcjonalny)"}/>
                </StudioSection>

                <StudioSection title={"Gdzie?"}>
                    <div className={styles.mapDiv}>
                        <MapContainer style={{width: "500px", height: "250px"}} center={[50.843300, 16.490660]} zoom={13} scrollWheelZoom>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[50.843300, 16.490660]}>
                                <Popup>
                                    Wybierz lokacje klikając na nią myszką
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </StudioSection>

                <StudioSection title={"Dla kogo?"}>
                    todo tagi
                </StudioSection>

                <div className={styles.submit}>
                    <PrimaryButton type={"submit"}>Dodaj</PrimaryButton>
                </div>
            </Form>
        </Formik>
    )
}

interface EventCreateValues {
    startDate: string
    finishDate?: string
    title: string
    subtitle?: string
    description?: string
    address?: {
        city: string
        place: string
        coordinates?: {
            latitude: number
            longitude: number
        }
    }
    tags: {
        id: string
    }[]
}