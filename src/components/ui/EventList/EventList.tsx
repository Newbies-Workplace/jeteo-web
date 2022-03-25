import React from 'react';
import { gql, useQuery} from "@apollo/client";
import {LectureCard} from "../../containers/LectureCard/LectureCard";
import exampleimg from "../../../assets/images/photos/test_img1.jpg";

const GET_LECTURES = gql`
    query getLectures($page: Int, $size: Int) {
        lectures(page: $page, size: $size) {
            id
            title
            subtitle
            author {
                nickname
            }
            timeFrame {
                startDate
            }
        }
    }
`;

export const EventList: React.FC = () => {

    const {loading, error, data} = useQuery(GET_LECTURES, {
        variables: {
            page: 1,
            size: 5,
        }
    });

    if (loading) return <>loading...</>;
    if (error) return <>error <br/>{error.message}</>;

    return (
        <div>
            {data && data.lectures.map((lecture: any) =>
                <LectureCard
                    key={lecture.id}
                    id={lecture.id}
                    title={lecture.title}
                    subtitle={lecture.subtitle} //lecture?.author?.nickname
                    startDate={new Date(lecture.timeFrame.startDate)}
                    image={exampleimg}
                />)}

        </div>
    )
}