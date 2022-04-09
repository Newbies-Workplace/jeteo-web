import React from 'react';
import { gql, useQuery} from "@apollo/client";
import {EventCard} from "../../containers/LectureCard/EventCard";
import exampleimg from "../../../assets/images/photos/test_img1.jpg";

const GET_EVENTS = gql`
    query getLectures($page: Int, $size: Int) {
        events(page: $page, size: $size) {
            id
            title
            subtitle
            author {
                nickname
            }
            timeFrame {
                startDate
            }
            theme {
                primaryColor
                image
            }
        }
    }
`;

export const EventList: React.FC = () => {

    const {loading, error, data} = useQuery(GET_EVENTS, {
        variables: {
            page: 1,
            size: 50,
        }
    });

    if (loading) return <>loading...</>;
    if (error) return <>error <br/>{error.message}</>;

    return (
        <div>
            {data && data.events.map((event: any) => //todo: convert to Model
                <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    subtitle={event.subtitle} //lecture?.author?.nickname
                    startDate={new Date(event.timeFrame.startDate)}
                    color={event.theme.primaryColor}
                    image={event.theme.image || exampleimg}
                />)}
        </div>
    )
}