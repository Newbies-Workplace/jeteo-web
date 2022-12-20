import React from "react";
import { Navigate, useParams } from "react-router";
import { useLectureWithRatesQuery } from "../../../../api/graphql";
import { StudioSection } from "../../../../components/ui/StudioSection/StudioSection";
import styles from "./LectureStats.module.scss"

export const LectureQuestions: React.FC = () => {

    const { name, lectureId } = useParams<{ name: string; lectureId: string }>();



    if (!name || !lectureId) {
        return <Navigate to="/" />;
    }

    const { data, error, loading } = useLectureWithRatesQuery({
        variables: { id: lectureId },
    });

    if (error) {
        return <i>Error</i>;
    }
    if (loading || !data) {
        return <p>Loading...</p>;
    }



    return (
        <div>Strona z pytaniami</div>
)};
