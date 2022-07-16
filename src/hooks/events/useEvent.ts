import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {EventDataQueryData, EventDataVars, GET_EVENT_QUERY} from "../../api/graphql/events/EventDataQuery";
import {Event} from "../../common/models/Event";

interface UseEventHookReturn {
    event?: Event
    loading: boolean
    error?: Error
}

export const useEvent = (id: string): UseEventHookReturn => {
    const [event, setEvent] = useState<Event>();

    const { loading, error, data } = useQuery<EventDataQueryData, EventDataVars>(
        GET_EVENT_QUERY, {
        variables: {
            id
        }
    })

    useEffect(() => {
        if (data?.event) {
            setEvent(Event.fromData(data?.event));
        }
    }, [data?.event]);

    return {
        event,
        loading,
        error,
    }
}