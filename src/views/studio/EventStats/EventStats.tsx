import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLectureWithRatesQuery } from "../../../api/graphql";
import styles from "./EventStats.module.scss";
import { ClickableStepView } from "../../../components/ui/StepView/StepView";
import { Toolbar } from "../Toolbar/Toolbar";

export const EventStats: React.FC = () => {
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

    const { rates, rateSummary } = data.lecture;

    if (!rates && !rateSummary) {
        return <p>Niestety nie masz żadnych ocen</p>;
    }

    const handleFunctionNotActive = () => {
        toast.error("Funkcja niedostępna");
    };


    console.log( rates, rateSummary)

    const reviewRates = rates.map( item =>{
        if (item.opinion) {
            return (
                <div className={styles.reviewBox}>
                    <p className={styles.review}>{item.opinion}</p>
                </div>
            )    
        }})

    return (
        <>
            <div className={styles.container}>
                <Toolbar
                    title={data.lecture.title}
                    onBackPress={() => {navigate(`/studio/events/${name}`)}}
                />
                <div className={styles.statsTabContainer}>
                    <ClickableStepView 
                        steps={["Opinie i oceny", "Pytania"]} 
                        activeStepIndex={active}
                        onStepClicked={(index => setActive(index))}
                    />
                </div>
                <div className={styles.statsMainContainer}>
                    <div className={styles.statsSection}>
                        <div className={styles.sectionDecorator}>
                            <div className={styles.dot}></div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.statsInnerWrapper}>
                            <span className={styles.title}>Ogólny odbiór</span>
                            <div className={styles.statsContent}>
                                <div className={styles.rateContainer}>
                                    <h3 className={styles.rateCounter}>Ilość ocen: {rateSummary.votesCount}</h3>
                                    <div className={styles.ratingStatsContainer}>
                                        <div className={styles.rateStatsBox}>
                                            <h4 className={styles.summaryRate}>{Math.floor(rateSummary.topicAvg)} / 5</h4>
                                            <h4 className={styles.rateTopic}>temat</h4>
                                            <p className={styles.rateDescription}></p>
                                        </div>
                                        <div className={styles.rateStatsBox}>
                                            <h4 className={styles.summaryRate}>{Math.floor(rateSummary.presentationAvg)} / 5</h4>
                                            <h4 className={styles.rateTopic}>Prezentacja</h4>
                                            <p className={styles.rateDescription}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                        <div className={styles.reviewContainer}>
                            <div className={styles.sectionDecorator}>
                                <div className={styles.dot}></div>
                                <div className={styles.line}></div>
                            </div>
                            <div className={styles.reviewInnerContainer}>
                                <span className={styles.title}>Opinie</span>
                                {reviewRates}
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

// export const LectureUpdateForm: React.FC = () => {
//     const navigate = useNavigate()
//     const {name, lectureId} = useParams<{name: string, lectureId: string}>()
//     const [lecture, setLecture] = useState<Lecture>()
//     const {loading, error} = useLectureQuery({
//         variables: {
//             id: lectureId!,
//         },
//         onCompleted: (data) => {
//             setLecture(Lecture.fromData(data.lecture))
//         }
//     })

//     if (loading || !lecture) return <>loading...</>;
//     if (error) return <p>error <br/>{error.message}</p>;

//     return (
//         <div className={studioFormStyles.container}>
//             <Toolbar
//                 title={"Edycja prelekcji"}
//                 onBackPress={() => {navigate(`/studio/events/${name}/edit`)}}/>

//             <div className={studioFormStyles.innerContainer}>
//                 <LectureBasicInfoForm
//                     eventId={getIdFromVanityUrl(name)}
//                     lecture={lecture}
//                     onSubmitted={() => navigate(`/studio/events/${name}/edit`)}/>
//             </div>
//         </div>
//     )
// }
