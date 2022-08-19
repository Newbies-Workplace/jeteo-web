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
  city: Scalars['String'];
  coordinates?: InputMaybe<CoordinatesRequestInput>;
  place: Scalars['String'];
};

export type AddressResponse = {
  __typename?: 'AddressResponse';
  city: Scalars['String'];
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
  secondaryColor?: InputMaybe<Scalars['String']>;
};

export type EventVisibilityRequestInput = {
  visibility: Visibility;
};

export type LectureFilterInput = {
  eventId: Scalars['String'];
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
  /** Creates tag */
  createTag: TagResponse;
  /** Delete event by id */
  deleteEvent: Scalars['Boolean'];
  /** Delete lecture by id */
  deleteLecture: Scalars['Boolean'];
  /** Follow event by id */
  followEvent: Scalars['Boolean'];
  /** Appends new tags to followed list */
  followTags: Array<TagResponse>;
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


export type MutationCreateTagArgs = {
  request: TagCreateRequestInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLectureArgs = {
  id: Scalars['String'];
};


export type MutationFollowEventArgs = {
  id: Scalars['String'];
};


export type MutationFollowTagsArgs = {
  request: Array<TagRequestInput>;
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
  secondaryColor?: Maybe<Scalars['String']>;
};

export type TimeFrameRequestInput = {
  finishDate?: InputMaybe<Scalars['Instant']>;
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
  contact: ContactResponse;
  createDate: Scalars['Instant'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  nickname: Scalars['String'];
  updateDate: Scalars['Instant'];
};

export const enum Visibility {
  Invisible = 'INVISIBLE',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
};

export type EventsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<EventFilterInput>;
}>;


export type EventsListQuery = { __typename?: 'Query', events: Array<{ __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, city: string } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> }> };

export type CoreEventResponseFragment = { __typename?: 'EventResponse', id: string, title: string, subtitle?: string | undefined, description?: string | undefined, vanityUrl: string, visibility: Visibility, author: { __typename?: 'UserResponse', nickname: string }, timeFrame: { __typename?: 'TimeFrameResponse', startDate: string, finishDate?: string | undefined }, address?: { __typename?: 'AddressResponse', place: string, city: string } | undefined, theme: { __typename?: 'ThemeResponse', primaryColor?: string | undefined, image?: string | undefined }, tags: Array<{ __typename?: 'TagResponse', id: string, name: string }> };

export const CoreEventResponseFragmentDoc = gql`
    fragment CoreEventResponse on EventResponse {
  id
  title
  subtitle
  description
  vanityUrl
  author {
    nickname
  }
  timeFrame {
    startDate
    finishDate
  }
  address {
    place
    city
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