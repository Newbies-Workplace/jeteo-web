import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {Field, Form, Formik, FormikValues} from "formik";
import {EventVisibilityRequestInput, useChangeEventVisibilityMutation, Visibility} from "../../../../api/graphql";
import {Event} from "../../../../common/models/Event";

interface EventVisibilityFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventVisibilityForm: React.FC<EventVisibilityFormProps> = ({event, onSubmitted}) => {
    const [changeVisibility] = useChangeEventVisibilityMutation()

    const initialValues: EventChangeVisibilityValues = event ? {
        visibility: event.visibility
    } : {
        visibility: Visibility.PRIVATE,
    }

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
                    prywatna
                    <Field type={"radio"} name={"visibility"} value={Visibility.PRIVATE}/>
                    niepubliczna
                    <Field type={"radio"} name={"visibility"} value={Visibility.INVISIBLE}/>
                    publiczna
                    <Field type={"radio"} name={"visibility"} value={Visibility.PUBLIC}/>
                </StudioSection>

                <PrimaryButton type={"submit"}>Gotowe</PrimaryButton>
            </Form>
        </Formik>
    )
}

interface EventChangeVisibilityValues {
    visibility: string
}