import React from "react";
import {StudioSection} from "../../../../components/ui/StudioSection/StudioSection";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import {useMutation} from "@apollo/client";
import {
    CHANGE_EVENT_VISIBILITY_MUTATION,
    EventChangeVisibilityData,
    EventChangeVisibilityVars, EventVisibilityRequestInput
} from "../../../../api/graphql/events/EventUpdateVisibilityMutation";
import {Field, Form, Formik, FormikValues} from "formik";
import {Visibility} from "../../../../api/graphql/events/EventListQuery";

interface EventVisibilityFormProps {
    eventId: string,
    onSubmitted: () => void
}

export const EventVisibilityForm: React.FC<EventVisibilityFormProps> = ({eventId, onSubmitted}) => {
    const [changeVisibility] = useMutation<EventChangeVisibilityData, EventChangeVisibilityVars>(CHANGE_EVENT_VISIBILITY_MUTATION)

    const initialValues: EventChangeVisibilityValues = {
        visibility: Visibility.PRIVATE,
    }

    const onSubmitClicked = (values: FormikValues) => {
        const request: EventVisibilityRequestInput = {
            visibility: values.visibility,
        }
        console.log(request)
        changeVisibility({
            variables: {
                id: eventId,
                request: request,
            }
        })
            .then((res) => {
                console.log(res)
                onSubmitted()
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