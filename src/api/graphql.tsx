import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Instant: string;
};

export type AddressRequestInput = {
  coordinates?: InputMaybe<CoordinatesRequestInput>;
  place: Scalars['String'];
};

export type AddressResponse = {
  __typename?: 'AddressResponse';
  coordinates?: Maybe<CoordinatesResponse>;
  place: Scalars['String'];
};

export type ContactRequestInput = {
  github?: InputMaybe<Scalars['String']>;
  linkedin?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
};

export type ContactResponse = {
  __typename?: 'ContactResponse';
  github?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type CoordinatesRequestInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CoordinatesResponse = {
  __typename?: 'CoordinatesResponse';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type EventFilterInput = {
  authorId?: InputMaybe<Scalars['String']>;
  visibilityIn: Array<Visibility>;
};

export type EventRequestInput = {
  address?: InputMaybe<AddressRequestInput>;
  description?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  tags: Array<TagRequestInput>;
  timeFrame: TimeFrameRequestInput;
  title: Scalars['String'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  address?: Maybe<AddressResponse>;
  /** Event creator */
  author: UserResponse;
  authorId: Scalars['String'];
  createDate: Scalars['Instant'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** Is event followed by current user */
  isFollowed: Scalars['Boolean'];
  subtitle?: Maybe<Scalars['String']>;
  tags: Array<TagResponse>;
  theme: ThemeResponse;
  timeFrame: TimeFrameResponse;
  title: Scalars['String'];
  updateDate: Scalars['Instant'];
  vanityUrl: Scalars['String'];
  visibility: Visibility;
};

export type EventThemeRequestInput = {
  primaryColor?: InputMaybe<Scalars['String']>;
};

export type EventVisibilityRequestInput = {
  visibility: Visibility;
};

export type LectureFilterInput = {
  eventId: Scalars['String'];
};

export type LectureInviteRequestInput = {
  name: Scalars['String'];
};

export type LectureInviteResponse = {
  __typename?: 'LectureInviteResponse';
  createDate: Scalars['Instant'];
  id: Scalars['String'];
  lectureId: Scalars['String'];
  name: Scalars['String'];
};

export type LectureRateRequestInput = {
  opinion?: InputMaybe<Scalars['String']>;
  presentationRate: Scalars['Int'];
  topicRate: Scalars['Int'];
};

export type LectureRateResponse = {
  __typename?: 'LectureRateResponse';
  createDate: Scalars['Instant'];
  id: Scalars['String'];
  lectureId: Scalars['String'];
  opinion?: Maybe<Scalars['String']>;
  presentationRate: Scalars['Int'];
  topicRate: Scalars['Int'];
};

export type LectureRequestInput = {
  description?: InputMaybe<Scalars['String']>;
  speakerIds: Array<Scalars['String']>;
  timeFrame: TimeFrameRequestInput;
  title: Scalars['String'];
};

export type LectureResponse = {
  __typename?: 'LectureResponse';
  author: UserResponse;
  createDate: Scalars['Instant'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** Lecture speaker invites */
  invites: Array<LectureInviteResponse>;
  /** Lecture rates summary */
  rateSummary: RateSummary;
  /** Lecture rates */
  rates: Array<LectureRateResponse>;
  speakers: Array<UserResponse>;
  timeFrame: TimeFrameResponse;
  title: Scalars['String'];
  updateDate: Scalars['Instant'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change event visibility */
  changeEventVisibility: EventResponse;
  /** Create event with request */
  createEvent: EventResponse;
  /** Create lecture with request */
  createLecture: LectureResponse;
  /** Create lecture speaker invite */
  createLectureInvite: LectureInviteResponse;
  /** Creates tag */
  createTag: TagResponse;
  /** Delete event by id */
  deleteEvent: Scalars['Boolean'];
  /** Delete lecture by id */
  deleteLecture: Scalars['Boolean'];
  /** Delete lecture invite by id */
  deleteLectureInvite: Scalars['Boolean'];
  /** Follow event by id */
  followEvent: Scalars['Boolean'];
  /** Appends new tags to followed list */
  followTags: Array<TagResponse>;
  /** Creates rate lecture */
  rateLecture: LectureRateResponse;
  /** Replace event data with new data (PUT equivalent) */
  replaceEvent: EventResponse;
  /** Replace event theme with new one (PUT equivalent) */
  replaceEventTheme: EventResponse;
  /** Replace lecture data with new data (PUT equivalent) */
  replaceLecture: LectureResponse;
  /** Replace user data with new data (PUT equivalent) */
  replaceMyUser: UserResponse;
  /** Unfollow event by id */
  unfollowEvent: Scalars['Boolean'];
  /** Removes tags from followed list */
  unfollowTags: Scalars['Boolean'];
  /** Use lecture invitation */
  useLectureInvite: Scalars['Boolean'];
};


export type MutationChangeEventVisibilityArgs = {
  id: Scalars['String'];
  request: EventVisibilityRequestInput;
};


export type MutationCreateEventArgs = {
  request: EventRequestInput;
};


export type MutationCreateLectureArgs = {
  eventId: Scalars['String'];
  request: LectureRequestInput;
};


export type MutationCreateLectureInviteArgs = {
  lectureId: Scalars['String'];
  request: LectureInviteRequestInput;
};


export type MutationCreateTagArgs = {
  request: TagCreateRequestInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLectureArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLectureInviteArgs = {
  inviteId: Scalars['String'];
};


export type MutationFollowEventArgs = {
  id: Scalars['String'];
};


export type MutationFollowTagsArgs = {
  request: Array<TagRequestInput>;
};


export type MutationRateLectureArgs = {
  id: Scalars['String'];
  request: LectureRateRequestInput;
};


export type MutationReplaceEventArgs = {
  id: Scalars['String'];
  request: EventRequestInput;
};


export type MutationReplaceEventThemeArgs = {
  id: Scalars['String'];
  request: EventThemeRequestInput;
};


export type MutationReplaceLectureArgs = {
  id: Scalars['String'];
  request: LectureRequestInput;
};


export type MutationReplaceMyUserArgs = {
  request: UserRequestInput;
};


export type MutationUnfollowEventArgs = {
  id: Scalars['String'];
};


export type MutationUnfollowTagsArgs = {
  request: Array<TagRequestInput>;
};


export type MutationUseLectureInviteArgs = {
  inviteId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Get single event by its id */
  event: EventResponse;
  /** Get all events paged */
  events: Array<EventResponse>;
  /** Get tags followed by user (paged) */
  followedTags: Array<TagResponse>;
  /** Get single lecture by its id */
  lecture: LectureResponse;
  /** Get all event lectures */
  lectures: Array<LectureResponse>;
  /** Get tag by id */
  tag?: Maybe<TagResponse>;
  /** Get all tags paged */
  tags: Array<TagResponse>;
  /** Get user by id */
  user?: Maybe<UserResponse>;
  /** Get all users paged */
  users: Array<UserResponse>;
};


export type QueryEventArgs = {
  id: Scalars['String'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<EventFilterInput>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryFollowedTagsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryLectureArgs = {
  id: Scalars['String'];
};


export type QueryLecturesArgs = {
  filter: LectureFilterInput;
};


export type QueryTagArgs = {
  id: Scalars['String'];
};


export type QueryTagsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type RateSummary = {
  __typename?: 'RateSummary';
  presentationAvg: Scalars['Float'];
  topicAvg: Scalars['Float'];
  votesCount: Scalars['Int'];
};

export type TagCreateRequestInput = {
  name: Scalars['String'];
};

export type TagRequestInput = {
  id: Scalars['String'];
};

export type TagResponse = {
  __typename?: 'TagResponse';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ThemeResponse = {
  __typename?: 'ThemeResponse';
  image?: Maybe<Scalars['String']>;
  primaryColor?: Maybe<Scalars['String']>;
};

export type TimeFrameRequestInput = {
  finishDate: Scalars['Instant'];
  startDate: Scalars['Instant'];
};

export type TimeFrameResponse = {
  __typename?: 'TimeFrameResponse';
  finishDate?: Maybe<Scalars['Instant']>;
  startDate: Scalars['Instant'];
};

export type UserRequestInput = {
  contact: ContactRequestInput;
  description?: InputMaybe<Scalars['String']>;
  nickname: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  avatar?: Maybe<Scalars['String']>;
  contact: ContactResponse;
  createDate: Scalars['Instant'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  nickname: Scalars['String'];
  updateDate: Scalars['Instant'];
};

export const enum Visibility {
  INVISIBLE = 'INVISIBLE',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
};

export type EventsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<EventFilterInput>;
}>;


export type EventsListQuery = { __typename?: 'Query', events: Array<{ __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> }> };

export type EventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> }, lectures: Array<{ __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }> }> };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: boolean };

export type CreateEventMutationVariables = Exact<{
  request: EventRequestInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> } };

export type ReplaceEventMutationVariables = Exact<{
  id: Scalars['String'];
  request: EventRequestInput;
}>;


export type ReplaceEventMutation = { __typename?: 'Mutation', replaceEvent: { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> } };

export type ReplaceEventThemeMutationVariables = Exact<{
  id: Scalars['String'];
  request: EventThemeRequestInput;
}>;


export type ReplaceEventThemeMutation = { __typename?: 'Mutation', replaceEventTheme: { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> } };

export type ChangeEventVisibilityMutationVariables = Exact<{
  id: Scalars['String'];
  request: EventVisibilityRequestInput;
}>;


export type ChangeEventVisibilityMutation = { __typename?: 'Mutation', changeEventVisibility: { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> } };

export type CoreEventResponseFragment = { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string, avatar?: string | undefined, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, coordinates?: { __typename?: 'CoordinatesResponse', latitude: number, longitude: number } | undefined } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> };

export type LecturesListQueryVariables = Exact<{
  filter: LectureFilterInput;
}>;


export type LecturesListQuery = { __typename?: 'Query', lectures: Array<{ __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }> }> };

export type LectureQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type LectureQuery = { __typename?: 'Query', lecture: { __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }>, invites: Array<{ __typename?: 'LectureInviteResponse', id: string, name: string }> } };

export type LectureWithRatesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type LectureWithRatesQuery = { __typename?: 'Query', lecture: { __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, rates: Array<{ __typename?: 'LectureRateResponse', id: string, opinion?: string | undefined }>, rateSummary: { __typename?: 'RateSummary', topicAvg: number, presentationAvg: number, votesCount: number }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }> } };

export type CreateLectureMutationVariables = Exact<{
  eventId: Scalars['String'];
  request: LectureRequestInput;
}>;


export type CreateLectureMutation = { __typename?: 'Mutation', createLecture: { __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }> } };

export type CreateLectureInviteMutationVariables = Exact<{
  lectureId: Scalars['String'];
  request: LectureInviteRequestInput;
}>;


export type CreateLectureInviteMutation = { __typename?: 'Mutation', createLectureInvite: { __typename?: 'LectureInviteResponse', id: string, name: string } };

export type DeleteLectureInviteMutationVariables = Exact<{
  inviteId: Scalars['String'];
}>;


export type DeleteLectureInviteMutation = { __typename?: 'Mutation', deleteLectureInvite: boolean };

export type ReplaceLectureMutationVariables = Exact<{
  id: Scalars['String'];
  request: LectureRequestInput;
}>;


export type ReplaceLectureMutation = { __typename?: 'Mutation', replaceLecture: { __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }> } };

export type DeleteLectureMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteLectureMutation = { __typename?: 'Mutation', deleteLecture: boolean };

export type RateLectureMutationVariables = Exact<{
  id: Scalars['String'];
  request: LectureRateRequestInput;
}>;


export type RateLectureMutation = { __typename?: 'Mutation', rateLecture: { __typename?: 'LectureRateResponse', id: string } };

export type CoreLectureResponseFragment = { __typename?: 'LectureResponse', id: string, title: string, description?: string | undefined, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, author: { __typename?: 'UserResponse', id: string, nickname: string, avatar?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, linkedin?: string | undefined, mail?: string | undefined, twitter?: string | undefined } }, speakers: Array<{ __typename?: 'UserResponse', id: string, avatar?: string | undefined, nickname: string }> };

export type InviteLectureResponseFragment = { __typename?: 'LectureResponse', invites: Array<{ __typename?: 'LectureInviteResponse', id: string, name: string }> };

export type CreateTagMutationVariables = Exact<{
  request: TagCreateRequestInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'TagResponse', id: string, name: string } };

export type TagListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type TagListQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> };

export type CoreTagResponseFragment = { __typename?: 'TagResponse', id: string, name: string };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'UserResponse', avatar?: string | undefined, nickname: string, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, twitter?: string | undefined, linkedin?: string | undefined, mail?: string | undefined } } | undefined };

export type ReplaceMyUserMutationVariables = Exact<{
  request: UserRequestInput;
}>;


export type ReplaceMyUserMutation = { __typename?: 'Mutation', replaceMyUser: { __typename?: 'UserResponse', avatar?: string | undefined, nickname: string, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, twitter?: string | undefined, linkedin?: string | undefined, mail?: string | undefined } } };

export type CoreUserResponseFragment = { __typename?: 'UserResponse', avatar?: string | undefined, nickname: string, description?: string | undefined, contact: { __typename?: 'ContactResponse', github?: string | undefined, twitter?: string | undefined, linkedin?: string | undefined, mail?: string | undefined } };

export const CoreEventResponseFragmentDoc = gql`
    fragment CoreEventResponse on EventResponse {
  id
  title
  subtitle
  description
  vanityUrl
  author {
    nickname
    avatar
    description
    contact {
      github
      linkedin
      mail
      twitter
    }
  }
  timeFrame {
    startDate
    finishDate
  }
  address {
    place
    coordinates {
      latitude
      longitude
    }
  }
  theme {
    primaryColor
    image
  }
  visibility
  tags {
    id
    name
  }
}
    `;
export const CoreLectureResponseFragmentDoc = gql`
    fragment CoreLectureResponse on LectureResponse {
  id
  title
  description
  timeFrame {
    startDate
    finishDate
  }
  author {
    id
    nickname
    avatar
    contact {
      github
      linkedin
      mail
      twitter
    }
  }
  speakers {
    id
    avatar
    nickname
  }
}
    `;
export const InviteLectureResponseFragmentDoc = gql`
    fragment InviteLectureResponse on LectureResponse {
  invites {
    id
    name
  }
}
    `;
export const CoreTagResponseFragmentDoc = gql`
    fragment CoreTagResponse on TagResponse {
  id
  name
}
    `;
export const CoreUserResponseFragmentDoc = gql`
    fragment CoreUserResponse on UserResponse {
  avatar
  nickname
  contact {
    github
    twitter
    linkedin
    mail
  }
  description
}
    `;
export const EventsListDocument = gql`
    query EventsList($page: Int, $size: Int, $filter: EventFilterInput) {
  events(page: $page, size: $size, filter: $filter) {
    ...CoreEventResponse
  }
}
    ${CoreEventResponseFragmentDoc}`;

/**
 * __useEventsListQuery__
 *
 * To run a query within a React component, call `useEventsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEventsListQuery(baseOptions?: Apollo.QueryHookOptions<EventsListQuery, EventsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsListQuery, EventsListQueryVariables>(EventsListDocument, options);
      }
export function useEventsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsListQuery, EventsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsListQuery, EventsListQueryVariables>(EventsListDocument, options);
        }
export type EventsListQueryHookResult = ReturnType<typeof useEventsListQuery>;
export type EventsListLazyQueryHookResult = ReturnType<typeof useEventsListLazyQuery>;
export type EventsListQueryResult = Apollo.QueryResult<EventsListQuery, EventsListQueryVariables>;
export const EventDocument = gql`
    query Event($id: String!) {
  event(id: $id) {
    ...CoreEventResponse
  }
  lectures(filter: {eventId: $id}) {
    ...CoreLectureResponse
  }
}
    ${CoreEventResponseFragmentDoc}
${CoreLectureResponseFragmentDoc}`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: String!) {
  deleteEvent(id: $id)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($request: EventRequestInput!) {
  createEvent(request: $request) {
    ...CoreEventResponse
  }
}
    ${CoreEventResponseFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const ReplaceEventDocument = gql`
    mutation ReplaceEvent($id: String!, $request: EventRequestInput!) {
  replaceEvent(id: $id, request: $request) {
    ...CoreEventResponse
  }
}
    ${CoreEventResponseFragmentDoc}`;
export type ReplaceEventMutationFn = Apollo.MutationFunction<ReplaceEventMutation, ReplaceEventMutationVariables>;

/**
 * __useReplaceEventMutation__
 *
 * To run a mutation, you first call `useReplaceEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceEventMutation, { data, loading, error }] = useReplaceEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useReplaceEventMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceEventMutation, ReplaceEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceEventMutation, ReplaceEventMutationVariables>(ReplaceEventDocument, options);
      }
export type ReplaceEventMutationHookResult = ReturnType<typeof useReplaceEventMutation>;
export type ReplaceEventMutationResult = Apollo.MutationResult<ReplaceEventMutation>;
export type ReplaceEventMutationOptions = Apollo.BaseMutationOptions<ReplaceEventMutation, ReplaceEventMutationVariables>;
export const ReplaceEventThemeDocument = gql`
    mutation ReplaceEventTheme($id: String!, $request: EventThemeRequestInput!) {
  replaceEventTheme(id: $id, request: $request) {
    ...CoreEventResponse
  }
}
    ${CoreEventResponseFragmentDoc}`;
export type ReplaceEventThemeMutationFn = Apollo.MutationFunction<ReplaceEventThemeMutation, ReplaceEventThemeMutationVariables>;

/**
 * __useReplaceEventThemeMutation__
 *
 * To run a mutation, you first call `useReplaceEventThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceEventThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceEventThemeMutation, { data, loading, error }] = useReplaceEventThemeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useReplaceEventThemeMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceEventThemeMutation, ReplaceEventThemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceEventThemeMutation, ReplaceEventThemeMutationVariables>(ReplaceEventThemeDocument, options);
      }
export type ReplaceEventThemeMutationHookResult = ReturnType<typeof useReplaceEventThemeMutation>;
export type ReplaceEventThemeMutationResult = Apollo.MutationResult<ReplaceEventThemeMutation>;
export type ReplaceEventThemeMutationOptions = Apollo.BaseMutationOptions<ReplaceEventThemeMutation, ReplaceEventThemeMutationVariables>;
export const ChangeEventVisibilityDocument = gql`
    mutation ChangeEventVisibility($id: String!, $request: EventVisibilityRequestInput!) {
  changeEventVisibility(id: $id, request: $request) {
    ...CoreEventResponse
  }
}
    ${CoreEventResponseFragmentDoc}`;
export type ChangeEventVisibilityMutationFn = Apollo.MutationFunction<ChangeEventVisibilityMutation, ChangeEventVisibilityMutationVariables>;

/**
 * __useChangeEventVisibilityMutation__
 *
 * To run a mutation, you first call `useChangeEventVisibilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEventVisibilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEventVisibilityMutation, { data, loading, error }] = useChangeEventVisibilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChangeEventVisibilityMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEventVisibilityMutation, ChangeEventVisibilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEventVisibilityMutation, ChangeEventVisibilityMutationVariables>(ChangeEventVisibilityDocument, options);
      }
export type ChangeEventVisibilityMutationHookResult = ReturnType<typeof useChangeEventVisibilityMutation>;
export type ChangeEventVisibilityMutationResult = Apollo.MutationResult<ChangeEventVisibilityMutation>;
export type ChangeEventVisibilityMutationOptions = Apollo.BaseMutationOptions<ChangeEventVisibilityMutation, ChangeEventVisibilityMutationVariables>;
export const LecturesListDocument = gql`
    query LecturesList($filter: LectureFilterInput!) {
  lectures(filter: $filter) {
    ...CoreLectureResponse
  }
}
    ${CoreLectureResponseFragmentDoc}`;

/**
 * __useLecturesListQuery__
 *
 * To run a query within a React component, call `useLecturesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useLecturesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLecturesListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useLecturesListQuery(baseOptions: Apollo.QueryHookOptions<LecturesListQuery, LecturesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LecturesListQuery, LecturesListQueryVariables>(LecturesListDocument, options);
      }
export function useLecturesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LecturesListQuery, LecturesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LecturesListQuery, LecturesListQueryVariables>(LecturesListDocument, options);
        }
export type LecturesListQueryHookResult = ReturnType<typeof useLecturesListQuery>;
export type LecturesListLazyQueryHookResult = ReturnType<typeof useLecturesListLazyQuery>;
export type LecturesListQueryResult = Apollo.QueryResult<LecturesListQuery, LecturesListQueryVariables>;
export const LectureDocument = gql`
    query Lecture($id: String!) {
  lecture(id: $id) {
    ...CoreLectureResponse
    ...InviteLectureResponse
  }
}
    ${CoreLectureResponseFragmentDoc}
${InviteLectureResponseFragmentDoc}`;

/**
 * __useLectureQuery__
 *
 * To run a query within a React component, call `useLectureQuery` and pass it any options that fit your needs.
 * When your component renders, `useLectureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLectureQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLectureQuery(baseOptions: Apollo.QueryHookOptions<LectureQuery, LectureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LectureQuery, LectureQueryVariables>(LectureDocument, options);
      }
export function useLectureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LectureQuery, LectureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LectureQuery, LectureQueryVariables>(LectureDocument, options);
        }
export type LectureQueryHookResult = ReturnType<typeof useLectureQuery>;
export type LectureLazyQueryHookResult = ReturnType<typeof useLectureLazyQuery>;
export type LectureQueryResult = Apollo.QueryResult<LectureQuery, LectureQueryVariables>;
export const LectureWithRatesDocument = gql`
    query LectureWithRates($id: String!) {
  lecture(id: $id) {
    ...CoreLectureResponse
    rates {
      id
      opinion
    }
    rateSummary {
      topicAvg
      presentationAvg
      votesCount
    }
  }
}
    ${CoreLectureResponseFragmentDoc}`;

/**
 * __useLectureWithRatesQuery__
 *
 * To run a query within a React component, call `useLectureWithRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLectureWithRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLectureWithRatesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLectureWithRatesQuery(baseOptions: Apollo.QueryHookOptions<LectureWithRatesQuery, LectureWithRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LectureWithRatesQuery, LectureWithRatesQueryVariables>(LectureWithRatesDocument, options);
      }
export function useLectureWithRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LectureWithRatesQuery, LectureWithRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LectureWithRatesQuery, LectureWithRatesQueryVariables>(LectureWithRatesDocument, options);
        }
export type LectureWithRatesQueryHookResult = ReturnType<typeof useLectureWithRatesQuery>;
export type LectureWithRatesLazyQueryHookResult = ReturnType<typeof useLectureWithRatesLazyQuery>;
export type LectureWithRatesQueryResult = Apollo.QueryResult<LectureWithRatesQuery, LectureWithRatesQueryVariables>;
export const CreateLectureDocument = gql`
    mutation CreateLecture($eventId: String!, $request: LectureRequestInput!) {
  createLecture(eventId: $eventId, request: $request) {
    ...CoreLectureResponse
  }
}
    ${CoreLectureResponseFragmentDoc}`;
export type CreateLectureMutationFn = Apollo.MutationFunction<CreateLectureMutation, CreateLectureMutationVariables>;

/**
 * __useCreateLectureMutation__
 *
 * To run a mutation, you first call `useCreateLectureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLectureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLectureMutation, { data, loading, error }] = useCreateLectureMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateLectureMutation(baseOptions?: Apollo.MutationHookOptions<CreateLectureMutation, CreateLectureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLectureMutation, CreateLectureMutationVariables>(CreateLectureDocument, options);
      }
export type CreateLectureMutationHookResult = ReturnType<typeof useCreateLectureMutation>;
export type CreateLectureMutationResult = Apollo.MutationResult<CreateLectureMutation>;
export type CreateLectureMutationOptions = Apollo.BaseMutationOptions<CreateLectureMutation, CreateLectureMutationVariables>;
export const CreateLectureInviteDocument = gql`
    mutation CreateLectureInvite($lectureId: String!, $request: LectureInviteRequestInput!) {
  createLectureInvite(lectureId: $lectureId, request: $request) {
    id
    name
  }
}
    `;
export type CreateLectureInviteMutationFn = Apollo.MutationFunction<CreateLectureInviteMutation, CreateLectureInviteMutationVariables>;

/**
 * __useCreateLectureInviteMutation__
 *
 * To run a mutation, you first call `useCreateLectureInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLectureInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLectureInviteMutation, { data, loading, error }] = useCreateLectureInviteMutation({
 *   variables: {
 *      lectureId: // value for 'lectureId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateLectureInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateLectureInviteMutation, CreateLectureInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLectureInviteMutation, CreateLectureInviteMutationVariables>(CreateLectureInviteDocument, options);
      }
export type CreateLectureInviteMutationHookResult = ReturnType<typeof useCreateLectureInviteMutation>;
export type CreateLectureInviteMutationResult = Apollo.MutationResult<CreateLectureInviteMutation>;
export type CreateLectureInviteMutationOptions = Apollo.BaseMutationOptions<CreateLectureInviteMutation, CreateLectureInviteMutationVariables>;
export const DeleteLectureInviteDocument = gql`
    mutation DeleteLectureInvite($inviteId: String!) {
  deleteLectureInvite(inviteId: $inviteId)
}
    `;
export type DeleteLectureInviteMutationFn = Apollo.MutationFunction<DeleteLectureInviteMutation, DeleteLectureInviteMutationVariables>;

/**
 * __useDeleteLectureInviteMutation__
 *
 * To run a mutation, you first call `useDeleteLectureInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLectureInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLectureInviteMutation, { data, loading, error }] = useDeleteLectureInviteMutation({
 *   variables: {
 *      inviteId: // value for 'inviteId'
 *   },
 * });
 */
export function useDeleteLectureInviteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLectureInviteMutation, DeleteLectureInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLectureInviteMutation, DeleteLectureInviteMutationVariables>(DeleteLectureInviteDocument, options);
      }
export type DeleteLectureInviteMutationHookResult = ReturnType<typeof useDeleteLectureInviteMutation>;
export type DeleteLectureInviteMutationResult = Apollo.MutationResult<DeleteLectureInviteMutation>;
export type DeleteLectureInviteMutationOptions = Apollo.BaseMutationOptions<DeleteLectureInviteMutation, DeleteLectureInviteMutationVariables>;
export const ReplaceLectureDocument = gql`
    mutation ReplaceLecture($id: String!, $request: LectureRequestInput!) {
  replaceLecture(id: $id, request: $request) {
    ...CoreLectureResponse
  }
}
    ${CoreLectureResponseFragmentDoc}`;
export type ReplaceLectureMutationFn = Apollo.MutationFunction<ReplaceLectureMutation, ReplaceLectureMutationVariables>;

/**
 * __useReplaceLectureMutation__
 *
 * To run a mutation, you first call `useReplaceLectureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceLectureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceLectureMutation, { data, loading, error }] = useReplaceLectureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useReplaceLectureMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceLectureMutation, ReplaceLectureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceLectureMutation, ReplaceLectureMutationVariables>(ReplaceLectureDocument, options);
      }
export type ReplaceLectureMutationHookResult = ReturnType<typeof useReplaceLectureMutation>;
export type ReplaceLectureMutationResult = Apollo.MutationResult<ReplaceLectureMutation>;
export type ReplaceLectureMutationOptions = Apollo.BaseMutationOptions<ReplaceLectureMutation, ReplaceLectureMutationVariables>;
export const DeleteLectureDocument = gql`
    mutation DeleteLecture($id: String!) {
  deleteLecture(id: $id)
}
    `;
export type DeleteLectureMutationFn = Apollo.MutationFunction<DeleteLectureMutation, DeleteLectureMutationVariables>;

/**
 * __useDeleteLectureMutation__
 *
 * To run a mutation, you first call `useDeleteLectureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLectureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLectureMutation, { data, loading, error }] = useDeleteLectureMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLectureMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLectureMutation, DeleteLectureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLectureMutation, DeleteLectureMutationVariables>(DeleteLectureDocument, options);
      }
export type DeleteLectureMutationHookResult = ReturnType<typeof useDeleteLectureMutation>;
export type DeleteLectureMutationResult = Apollo.MutationResult<DeleteLectureMutation>;
export type DeleteLectureMutationOptions = Apollo.BaseMutationOptions<DeleteLectureMutation, DeleteLectureMutationVariables>;
export const RateLectureDocument = gql`
    mutation RateLecture($id: String!, $request: LectureRateRequestInput!) {
  rateLecture(id: $id, request: $request) {
    id
  }
}
    `;
export type RateLectureMutationFn = Apollo.MutationFunction<RateLectureMutation, RateLectureMutationVariables>;

/**
 * __useRateLectureMutation__
 *
 * To run a mutation, you first call `useRateLectureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateLectureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateLectureMutation, { data, loading, error }] = useRateLectureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRateLectureMutation(baseOptions?: Apollo.MutationHookOptions<RateLectureMutation, RateLectureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateLectureMutation, RateLectureMutationVariables>(RateLectureDocument, options);
      }
export type RateLectureMutationHookResult = ReturnType<typeof useRateLectureMutation>;
export type RateLectureMutationResult = Apollo.MutationResult<RateLectureMutation>;
export type RateLectureMutationOptions = Apollo.BaseMutationOptions<RateLectureMutation, RateLectureMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($request: TagCreateRequestInput!) {
  createTag(request: $request) {
    ...CoreTagResponse
  }
}
    ${CoreTagResponseFragmentDoc}`;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const TagListDocument = gql`
    query TagList($page: Int, $size: Int) {
  tags(page: $page, size: $size) {
    ...CoreTagResponse
  }
}
    ${CoreTagResponseFragmentDoc}`;

/**
 * __useTagListQuery__
 *
 * To run a query within a React component, call `useTagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useTagListQuery(baseOptions?: Apollo.QueryHookOptions<TagListQuery, TagListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagListQuery, TagListQueryVariables>(TagListDocument, options);
      }
export function useTagListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagListQuery, TagListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagListQuery, TagListQueryVariables>(TagListDocument, options);
        }
export type TagListQueryHookResult = ReturnType<typeof useTagListQuery>;
export type TagListLazyQueryHookResult = ReturnType<typeof useTagListLazyQuery>;
export type TagListQueryResult = Apollo.QueryResult<TagListQuery, TagListQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...CoreUserResponse
  }
}
    ${CoreUserResponseFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const ReplaceMyUserDocument = gql`
    mutation ReplaceMyUser($request: UserRequestInput!) {
  replaceMyUser(request: $request) {
    ...CoreUserResponse
  }
}
    ${CoreUserResponseFragmentDoc}`;
export type ReplaceMyUserMutationFn = Apollo.MutationFunction<ReplaceMyUserMutation, ReplaceMyUserMutationVariables>;

/**
 * __useReplaceMyUserMutation__
 *
 * To run a mutation, you first call `useReplaceMyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceMyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceMyUserMutation, { data, loading, error }] = useReplaceMyUserMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useReplaceMyUserMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceMyUserMutation, ReplaceMyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceMyUserMutation, ReplaceMyUserMutationVariables>(ReplaceMyUserDocument, options);
      }
export type ReplaceMyUserMutationHookResult = ReturnType<typeof useReplaceMyUserMutation>;
export type ReplaceMyUserMutationResult = Apollo.MutationResult<ReplaceMyUserMutation>;
export type ReplaceMyUserMutationOptions = Apollo.BaseMutationOptions<ReplaceMyUserMutation, ReplaceMyUserMutationVariables>;