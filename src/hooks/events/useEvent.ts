import {useEffect, useState} from "react";
import { useEventQuery} from "../../api/graphql";
import {Event} from "../../common/models/Event";

interface UseEventHookReturn {
    event?: Event
    loading: boolean
    error?: Error
}

export const useEvent = (id: string): UseEventHookReturn => {
    const [event, setEvent] = useState<Event>();

    const { loading, error, data } =

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