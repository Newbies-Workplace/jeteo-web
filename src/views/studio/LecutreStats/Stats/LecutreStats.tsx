import React from "react";
import { Navigate, useParams } from "react-router";
import { useLectureWithRatesQuery } from "../../../../api/graphql";
import { StudioSection } from "../../../../components/ui/StudioSection/StudioSection";
import styles from "./LectureStats.module.scss"

export const LectureStats: React.FC = () => {

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

    const { rates, rateSummary } = data.lecture;

    if (!rates && !rateSummary) {
        return <p>Niestety nie masz żadnych ocen</p>;
    }

    console.log(rates, rateSummary)


    const reviewRates = rates.map(item => {
        if (item.opinion) {
            return (
                <div className={styles.reviewBox}>
                    <p className={styles.review}>{item.opinion}</p>
                </div>
            )
        }
    })

    return (
    <div className={styles.statsMainContainer}>
        <StudioSection title={"Ogólny odbiór"}>
            <div className={styles.statsInnerWrapper}>
                <div className={styles.statsContent}>
                    <div className={styles.rateContainer}>
                        <h3 className={styles.rateCounter}>
                            Ilość ocen: {rateSummary.votesCount}
                        </h3>
                        <div className={styles.ratingStatsContainer}>
                            <div className={styles.rateStatsBox}>
                                <h4 className={styles.summaryRate}>
                                    {Math.floor(rateSummary.topicAvg)} / 5
                                </h4>
                                <h4 className={styles.rateTopic}>temat</h4>
                                <p className={styles.rateDescription} />
                            </div>
                            <div className={styles.rateStatsBox}>
                                <h4 className={styles.summaryRate}>
                                    {Math.floor(rateSummary.presentationAvg)} / 5
                                </h4>
                                <h4 className={styles.rateTopic}>Prezentacja</h4>
                                <p className={styles.rateDescription} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudioSection>

        <StudioSection title="Opinie">{reviewRates}</StudioSection>
    </div>
)};
