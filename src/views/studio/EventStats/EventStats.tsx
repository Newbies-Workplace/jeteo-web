import React from "react";
import {Navigate, useParams} from "react-router-dom";
import { useLectureWithRatesQuery } from "../../../api/graphql";



export const EventStats: React.FC = () => {

    const {name, lectureId} = useParams<{name: string, lectureId: string}>()

    if (!name || !lectureId){
        return <Navigate to="/"/>;
    }

    const {data, error, loading} = useLectureWithRatesQuery(
        {
            variables: {id: lectureId}
        }
    )

    if(error) {
        return <i>Error</i>
    }
    if(loading || !data){
        return <p>Loading...</p>
    }

    const {rates, rateSummary} = data.lecture;

    console.log(rates)
    if(!rates || rateSummary) {
        return (
            <p>Niestety nie masz żadnych ocen</p>
        )
    }

    return (
        <div><pre>rates</pre></div>
    )
}