import React, { useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useLectureWithRatesQuery } from "../../../api/graphql";
import { getIdFromVanityUrl } from "../../../common/utils/vanityUrlUtils";


export const EventStats: React.FC = () => {

    const navigate = useNavigate()
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