import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import Button from "../../../ui/Button/Button";
import {EventVisibilityRequestInput, useChangeEventVisibilityMutation, Visibility} from "../../../../api/graphql";
import {Event} from "../../../../common/models/Event";
import RadioButtons from "../../../ui/RadioButtons/RadioButtons";
import formStyles from "../../Form.module.scss";
import {toast} from "react-toastify";
import {Controller, useForm} from "react-hook-form";

interface EventVisibilityFormProps {
    event: Event
    onSubmitted: (event: Event) => void
}

export const EventVisibilityForm: React.FC<EventVisibilityFormProps> = ({event, onSubmitted}) => {
    const [changeVisibility] = useChangeEventVisibilityMutation()

    const visibilities = [
        {id: Visibility.PRIVATE, name: 'Prywatna'},
        {id: Visibility.INVISIBLE, name: 'Niepubliczna'},
        {id: Visibility.PUBLIC, name: 'Publiczna'},
    ]

    const initialValues: EventChangeVisibilityValues = event
        ? {visibility: event.visibility}
        : {visibility: Visibility.PRIVATE}

    const {control, handleSubmit} = useForm<EventChangeVisibilityValues>({defaultValues: initialValues})

    const onSubmitClicked = (values: EventChangeVisibilityValues) => {
        const request: EventVisibilityRequestInput = {
            visibility: values.visibility,
        }
        changeVisibility({
            variables: {
                id: event.id,
                request: request,
            }
        })
            .then((res) => res.data ?? Promise.reject("no data"))
            .then((data) => data.changeEventVisibility)
            .then(Event.fromData)
            .then((event) => {
                onSubmitted(event)

                toast.success("Widoczność zaktualizowano")
            })
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <form onSubmit={handleSubmit(onSubmitClicked)}>
            <StudioSection title={"Widoczność"}>
                <Controller
                    name={'visibility'}
                    control={control}
                    render={({field}) =>
                        <RadioButtons
                            values={visibilities}
                            selectedValueIndex={visibilities.findIndex((value) => value.id === field.value)}
                            onChange={(item) => field.onChange(item.id)} />

                    }/>
            </StudioSection>

            <div className={formStyles.submit}>
                <Button primary type={"submit"}>Gotowe</Button>
            </div>
        </form>
    )
}

interface EventChangeVisibilityValues {
    visibility: Visibility
}