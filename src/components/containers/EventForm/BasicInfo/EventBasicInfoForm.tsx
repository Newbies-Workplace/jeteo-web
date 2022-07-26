import React from "react";
import {Field, Form, Formik, FormikValues} from "formik";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import styles from "./EventBasicInfoForm.module.scss";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import dayjs from "dayjs";
import {useMutation} from "@apollo/client";
import {
    CREATE_EVENT_MUTATION,
    CreateEventMutationData,
    CreateEventMutationVars,
    EventRequestInput,
    REPLACE_EVENT_MUTATION,
    ReplaceEventMutationData,
    ReplaceEventMutationVars
} from "../../../../api/graphql/events/EventCreateMutation";
import {EventData} from "../../../../api/graphql/events/EventDataQuery";

interface EventBasicInfoFormProps {
    event: EventData | null
    onSubmitted: (event: EventData) => void
}

//todo: validation
export const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({event, onSubmitted}) => {
    const [createEvent] = useMutation<CreateEventMutationData, CreateEventMutationVars>(CREATE_EVENT_MUTATION)
    const [replaceEvent] = useMutation<ReplaceEventMutationData, ReplaceEventMutationVars>(REPLACE_EVENT_MUTATION)

    const initialValues: EventFormValues = event ? {
        startDate: dayjs(event.timeFrame.startDate).format("YYYY-MM-DDTHH:mm"),
        finishDate: event.timeFrame.finishDate ? dayjs(event.timeFrame.finishDate).format("YYYY-MM-DDTHH:mm") : undefined,
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        address: undefined,
        tags: [],
    } : {
        startDate: dayjs().format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs().add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: "",
        subtitle: undefined,
        description: undefined,
        address: undefined,
        tags: [],
    }

    const submitFunction = (request: EventRequestInput): Promise<EventData> => {
        if (event) {
            return replaceEvent({
                variables: {
                    id: event.id,
                    request: request,
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.replaceEvent)
        } else {
            return createEvent({
                variables: {
                    request: request
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.createEvent)
        }
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

        submitFunction(request)
            .then((event: EventData) => {
                console.log(event)
                onSubmitted(event)
            })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClicked}>
            <Form>
                <StudioSection title={"Co i kiedy?"}>
                    <div className={styles.row}>
                        od
                        <Field type={"datetime-local"} id={"startDate"} name={"startDate"} />
                        do (opcjonalne)
                        <Field type={"datetime-local"} id={"finishDate"} name={"finishDate"} />
                    </div>

                    <Field id={"title"} name={"title"} placeholder={"Tytuł"}/>
                    <Field id={"subtitle"} name={"subtitle"} placeholder={"Podtytuł (opcjonalny)"}/>
                    <Field id={"description"} name={"description"} placeholder={"Opis (opcjonalny)"}/>
                </StudioSection>

                <StudioSection title={"Gdzie?"}>
                    todo mapa
                </StudioSection>

                <StudioSection title={"Dla kogo?"}>
                    todo tagi
                </StudioSection>

                <div className={styles.submit}>
                    <PrimaryButton type={"submit"}>
                        {event ? "Zapisz" : "Dodaj"}
                    </PrimaryButton>
                </div>
            </Form>
        </Formik>
    )
}

interface EventFormValues {
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