import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import formStyles from "../../Form.module.scss"
import Button from "../../../ui/Button/Button";
import dayjs from "dayjs";
import TagPicker from "../../../ui/TagPicker/TagPicker";
import {Tag} from "../../../../common/models/Tag";
import {Event} from "../../../../common/models/Event";
import {
    EventRequestInput,
    useCreateEventMutation,
    useCreateTagMutation,
    useReplaceEventMutation, useTagListQuery
} from "../../../../api/graphql";
import {FieldProps} from "formik/dist/Field";
import MDEditor from "@uiw/react-md-editor";

interface EventBasicInfoFormProps {
    event?: Event
    onSubmitted: (event: Event) => void
}

//todo: validation
export const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({event, onSubmitted}) => {
    const [createTag] = useCreateTagMutation()
    const [createEvent] = useCreateEventMutation()
    const [replaceEvent] = useReplaceEventMutation()
    const [allTags, setAllTags] = useState<Tag[]>([])
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

    useTagListQuery({
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

    const initialValues: EventBasicFormValues = event ? {
        startDate: dayjs(event.startDate).format("YYYY-MM-DDTHH:mm"),
        finishDate: event?.finishDate ? dayjs(event.finishDate).format("YYYY-MM-DDTHH:mm") : undefined,
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

    const submitFunction = (request: EventRequestInput): Promise<Event> => {
        if (event) {
            return replaceEvent({
                variables: {
                    id: event.id,
                    request: request,
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.replaceEvent)
                .then(Event.fromData)
        } else {
            return createEvent({
                variables: {
                    request: request
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.createEvent)
                .then(Event.fromData)
        }
    }

    const onSubmitClicked = (values: EventBasicFormValues) => {
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
            .then((event: Event) => {
                onSubmitted(event)
            })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClicked}>
            <Form>
                <StudioSection title={"Co i kiedy?"}>
                    <div className={formStyles.row}>
                        od
                        <Field type={"datetime-local"} id={"startDate"} name={"startDate"} />
                        do (opcjonalne)
                        <Field type={"datetime-local"} id={"finishDate"} name={"finishDate"} />
                    </div>

                    <Field id={"title"} name={"title"} placeholder={"Tytuł"}/>
                    <Field id={"subtitle"} name={"subtitle"} placeholder={"Podtytuł (opcjonalny)"}/>

                    <h4>Opis</h4>
                    <Field
                        id={"description"}
                        name={"description"}
                        component={({field, form: {setFieldValue}}: FieldProps) =>
                            <div data-color-mode="light">
                                <MDEditor
                                    textareaProps={{maxLength: 10000}}
                                    height={200}
                                    value={field.value}
                                    onChange={(value) => setFieldValue(field.name, value)} />
                            </div>
                        } />
                </StudioSection>

                <StudioSection title={"Gdzie?"}>
                    <h4>W przyszłości...</h4>
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
                    <Button primary type={"submit"}>
                        {event ? "Zapisz" : "Dodaj"}
                    </Button>
                </div>
            </Form>
        </Formik>
    )
}

interface EventBasicFormValues {
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