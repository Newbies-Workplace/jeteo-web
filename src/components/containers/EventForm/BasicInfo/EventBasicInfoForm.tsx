import React, {useEffect, useState} from "react";
import {Field, Form, Formik, FormikValues} from "formik";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import styles from "./EventBasicInfoForm.module.scss";
import formStyles from "../EventForm.module.scss"
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import dayjs from "dayjs";
import {useMutation, useQuery} from "@apollo/client";
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
import TagPicker from "../../../ui/TagPicker/TagPicker";
import {GET_TAG_LIST_QUERY, TagListQueryData, TagListQueryVars} from "../../../../api/graphql/tags/TagListQuery";
import {Tag} from "../../../../common/models/Tag";
import {
    CREATE_TAG_MUTATION,
    CreateTagMutationData,
    CreateTagMutationVars
} from "../../../../api/graphql/tags/TagCreateMutation";
import {Event} from "../../../../common/models/Event";

interface EventBasicInfoFormProps {
    event?: Event
    onSubmitted: (event: Event) => void
}

//todo: validation
export const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({event, onSubmitted}) => {
    const [createTag] = useMutation<CreateTagMutationData, CreateTagMutationVars>(CREATE_TAG_MUTATION)
    const [createEvent] = useMutation<CreateEventMutationData, CreateEventMutationVars>(CREATE_EVENT_MUTATION)
    const [replaceEvent] = useMutation<ReplaceEventMutationData, ReplaceEventMutationVars>(REPLACE_EVENT_MUTATION)
    const [allTags, setAllTags] = useState<Tag[]>([])
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

    useQuery<TagListQueryData, TagListQueryVars>(
        GET_TAG_LIST_QUERY, {
            variables: {
                page: 1,
                size: 50,
            },
            onCompleted: (data) => {
                setAllTags(data.tags.map(Tag.fromData))
            }
        });

    useEffect(() => {
        setSelectedTagIds(initialValues.tags.map(tag => tag.id))
    }, [])

    const initialValues: EventFormValues = event ? {
        startDate: dayjs(event.startDate).format("YYYY-MM-DDTHH:mm"),
        finishDate: event.finishDate ? dayjs(event.finishDate).format("YYYY-MM-DDTHH:mm") : undefined,
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        address: undefined,
        tags: event.tags,
    } : {
        startDate: dayjs().format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs().add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: "",
        subtitle: undefined,
        description: undefined,
        address: undefined,
        tags: [],
    }

    const onTagCreate = (tagName: string) => {
        createTag({
            variables: {
                request: {
                    name: tagName
                }
            }
        }).then((res) => {
            if (res.data) {
                const tag = Tag.fromData(res.data.createTag)

                setAllTags([...allTags, tag])
                setSelectedTagIds([...selectedTagIds, tag.id])
            }
        })
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
            tags: selectedTagIds.map(id => ({id: id})),
        }

        submitFunction(request)
            .then((event: EventData) => {
                onSubmitted(Event.fromData(event))
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <TagPicker
                            tags={allTags.map(t => Tag.fromData(t))}
                            value={allTags.map(Tag.fromData).filter(tag => selectedTagIds.includes(tag.id))}
                            onChange={(tags) => {setSelectedTagIds(tags.map(tag => tag.id))}}
                            onCreate={(newTagName) => onTagCreate(newTagName)} />
                    </div>
                </StudioSection>

                <div className={formStyles.submit}>
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