import React, {useEffect, useState} from "react";
import {StudioSection} from "../../../../components/ui/StudioSection/StudioSection";
import formStyles from "../../Form.module.scss"
import Button from "../../../../components/ui/Button/Button";
import dayjs from "dayjs";
import TagPicker from "../../../../components/ui/TagPicker/TagPicker";
import {Tag} from "../../../../common/models/Tag";
import {Event} from "../../../../common/models/Event";
import {
    EventRequestInput,
    useCreateEventMutation,
    useCreateTagMutation,
    useReplaceEventMutation,
    useTagListQuery
} from "../../../../api/graphql";
import MDEditor from "@uiw/react-md-editor";
import {toast} from 'react-toastify';
import {MapPicker} from "../../../../components/ui/MapPicker/MapPicker";
import {Input} from "../../../../components/ui/Input/Input";
import {RadioButtons} from "../../../../components/ui/RadioButtons/RadioButtons";
import {useForm, Controller} from "react-hook-form";
import styles from "./EventBasicInfoForm.module.scss"

interface EventBasicInfoFormProps {
    event?: Event
    onSubmitted: (event: Event) => void
}

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
        location: event.location ? 'location' : 'online',
        startDate: dayjs(event.startDate).format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs(event.finishDate).format("YYYY-MM-DDTHH:mm"),
        title: event.title,
        subtitle: event.subtitle,
        description: event.description,
        address: event.location ? {
            place: event.location.place,
            coordinates: event.location.longitude && event.location.latitude ? {
                latitude: event.location.latitude,
                longitude: event.location.longitude,
            } : undefined
        } : undefined,
        tags: event.tags,
    } : {
        location: 'location',
        startDate: dayjs().format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs().add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: "",
        subtitle: undefined,
        description: undefined,
        address: undefined,
        tags: [],
    }

    const {register, handleSubmit, control, watch} = useForm<EventBasicFormValues>({defaultValues: initialValues});
    const watchOnline = watch('location', 'online')

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

    const locationOptions = [
        {id: 'online', name: 'On-line'},
        {id: 'location', name: 'Na miejscu'},
    ]

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
        const request: EventRequestInput = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            timeFrame: {
                startDate: dayjs(values.startDate).toISOString(),
                finishDate: dayjs(values.finishDate).toISOString(),
            },
            address: values.location === 'location' && values.address?.place ? {
                place: values.address?.place,
                coordinates: values.address?.coordinates ? {
                    latitude: values.address.coordinates.latitude,
                    longitude: values.address.coordinates.longitude,
                } : undefined,
            } : undefined,
            tags: selectedTagIds.map(id => ({id: id})),
        }

        submitFunction(request)
            .then((submittedEvent: Event) => {
                onSubmitted(submittedEvent)

                toast.success(event ? "Wydarzenie zaktualizowano" : "Wydarzenie dodano")
            })
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <form onSubmit={handleSubmit(onSubmitClicked)}>
            <StudioSection title={"Co i kiedy?"}>
                <div className={formStyles.row}>
                    <div className={formStyles.date}>
                        <b>Rozpoczęcie *</b>
                        <input
                            {...register('startDate')}
                            type={"datetime-local"}
                            className={formStyles.input}/>
                    </div>
                    <div className={formStyles.date}>
                        <b>Zakończenie *</b>
                        <input
                            {...register('finishDate')}
                            type={"datetime-local"}
                            className={formStyles.input}/>
                    </div>
                </div>

                <Controller
                    name={"title"}
                    control={control}
                    render={({field}) =>
                        <Input
                            required
                            label={"Tytuł"}
                            value={field.value}
                            setValue={(value) => field.onChange(value)}/>
                    } />

                <Controller
                    name={"subtitle"}
                    control={control}
                    render={({field}) =>
                        <Input
                            label={"Podtytuł"}
                            value={field.value ?? ''}
                            setValue={(value) => field.onChange(value)}/>
                    } />

                <label>Opis</label>
                <Controller
                    name={"description"}
                    control={control}
                    render={({field}) =>
                        <div data-color-mode="light">
                            <MDEditor
                                textareaProps={{maxLength: 10000}}
                                height={200}
                                value={field.value}
                                onChange={(value) => field.onChange(value)} />
                        </div>
                    } />
            </StudioSection>

            <StudioSection title={"Gdzie?"}>
                <Controller
                    name={"location"}
                    control={control}
                    render={({field}) =>
                        <RadioButtons
                            values={locationOptions}
                            selectedValueIndex={locationOptions.findIndex((value) => value.id === field.value)}
                            onChange={(item) => field.onChange(item.id)} />
                    } />

                {watchOnline === 'location' &&
                    <div className={styles.locationSection}>
                        <Controller
                            name={"address.coordinates"}
                            control={control}
                            render={({field}) =>
                                <MapPicker
                                    value={field.value ? {
                                        lat: field.value.latitude,
                                        lng: field.value.longitude,
                                    } : undefined}
                                    onChange={(value) => field.onChange({
                                        latitude: value.lat,
                                        longitude: value.lng,
                                    })}
                                />
                            }/>
                        <Controller
                            name={"address.place"}
                            control={control}
                            render={({field}) =>
                                <Input
                                    label={"Adres"}
                                    required
                                    value={field.value}
                                    setValue={(value) => field.onChange(value)}/>
                            }/>
                    </div>
                }
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
        </form>
    )
}

interface EventBasicFormValues {
    startDate: string
    finishDate: string
    title: string
    subtitle?: string
    description?: string
    location: 'online' | 'location'
    address?: {
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