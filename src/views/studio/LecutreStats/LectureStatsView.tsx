import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useLectureWithRatesQuery } from "../../../api/graphql";
import styles from "./LectureStats.module.scss";
import { ClickableStepView } from "../../../components/ui/StepView/StepView";
import { Toolbar } from "../Toolbar/Toolbar";
import {LectureStats} from './Stats/LecutreStats'
import {LectureQuestions} from "./Stats/LectureQuestions"

export const LectureStatsView: React.FC = () => {
    const { name, lectureId } = useParams<{ name: string; lectureId: string }>();
    const [active, setActive] = useState(0)

    if (!name || !lectureId) {
        return <Navigate to="/" />;
    }

    const navigate = useNavigate();

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
            <div className={styles.container}>
                <Toolbar
                    title={data.lecture.title}
                    onBackPress={() => { navigate(`/studio/events/${name}`) }}
                />
                <div className={styles.statsTabContainer}>
                    <ClickableStepView
                        steps={["Opinie i oceny", "Pytania"]}
                        activeStepIndex={active}
                        onStepClicked={index => {setActive(index); {index == 0 ? navigate(`/studio/events/${name}/lectures/${lectureId}/review`) : navigate(`/studio/events/${name}/lectures/${lectureId}/questions`)}}}
                    />
                </div>
                <Routes>
                    <Route
                        element={<LectureStats/>}
                        path="/review"
                    />
                    <Route
                        element={<LectureQuestions/>}
                        path="/questions"
                    />
                    <Route
                        element={<Navigate to={`/studio/events/${name}/lectures/${lectureId}/review`}/>}
                        path="*"
                    />

                </Routes>
            </div>
    );
};