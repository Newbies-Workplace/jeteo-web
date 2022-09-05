import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {Field, Form, Formik, FormikValues} from "formik";
import {EventVisibilityRequestInput, useChangeEventVisibilityMutation, Visibility} from "../../../../api/graphql";
import {Event} from "../../../../common/models/Event";
import {FieldProps} from "formik/dist/Field";
import RadioButtons from "../../../ui/RadioButtons/RadioButtons";

interface EventVisibilityFormProps {
    event: Event,
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

    const onSubmitClicked = (values: FormikValues) => {
        const request: EventVisibilityRequestInput = {
            visibility: values.visibility,
        }
        console.log(request)
        changeVisibility({
            variables: {
                id: event.id,
                request: request,
            }
        })
            .then((res) => {
                console.log(res)
                onSubmitted(event)
            })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClicked}>
            <Form>
                <StudioSection title={"Widoczność"}>
                    <Field
                        id={"visibility"}
                        name={"visibility"}
                        component={({field, form: {setFieldValue}}: FieldProps) =>
                            <RadioButtons
                                values={visibilities}
                                selectedValueIndex={visibilities.findIndex((value) => value.id === field.value)}
                                onChange={(item) => setFieldValue(field.name, item.id)} />
                        } />
                </StudioSection>

                <PrimaryButton type={"submit"}>Gotowe</PrimaryButton>
            </Form>
        </Formik>
    )
}

interface EventChangeVisibilityValues {
    visibility: string
}