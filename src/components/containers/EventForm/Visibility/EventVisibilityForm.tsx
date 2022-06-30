import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {useMutation} from "@apollo/client";
import {
    CHANGE_EVENT_VISIBILITY_MUTATION,
    EventChangeVisibilityData,
    EventChangeVisibilityVars, EventVisibilityRequestInput
} from "../../../../api/graphql/events/EventUpdateVisibilityMutation";
import {Field, Form, Formik, FormikValues} from "formik";
import {Visibility} from "../../../../api/graphql/events/EventListQuery";
import {EventData} from "../../../../api/graphql/events/EventDataQuery";

interface EventVisibilityFormProps {
    event: EventData,
    onSubmitted: (event: EventData) => void
}

export const EventVisibilityForm: React.FC<EventVisibilityFormProps> = ({event, onSubmitted}) => {
    const [changeVisibility] = useMutation<EventChangeVisibilityData, EventChangeVisibilityVars>(CHANGE_EVENT_VISIBILITY_MUTATION)

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