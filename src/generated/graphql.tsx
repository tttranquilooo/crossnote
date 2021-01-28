import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
  UUID: any;
  Upload: any;
}

export interface WidgetInstance {
  type: WidgetType;
}

export interface AuthReturn {
   __typename?: 'AuthReturn';
  /** JSON Web Token */
  token: Scalars['String'];
  /** User */
  user: User;
}

export interface Widget {
   __typename?: 'Widget';
  id: Scalars['UUID'];
  instance: WidgetInstance;
  owner: User;
  description: Scalars['String'];
  source: Scalars['String'];
  canConfigure: Scalars['Boolean'];
}

export interface NotificationConnection {
   __typename?: 'NotificationConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<NotificationEdge>;
}

export interface StarNotebook {
  notebookID: Scalars['UUID'];
}

export interface UserWidget {
   __typename?: 'UserWidget';
  type: WidgetType;
  count: Scalars['Int'];
}

export interface Query {
   __typename?: 'Query';
  test: Scalars['String'];
  widget: Widget;
  notebooks: Array<Notebook>;
  viewer: User;
  user: User;
  stats: Stats;
}


export interface QueryWidgetArgs {
  id: Scalars['UUID'];
}


export interface QueryNotebooksArgs {
  orderBy?: Maybe<NotebookOrderBy>;
  query?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
}


export interface QueryUserArgs {
  id?: Maybe<Scalars['UUID']>;
  username?: Maybe<Scalars['String']>;
}

export enum WidgetType {
  Comment = 'COMMENT'
}

export interface PageInfo {
   __typename?: 'PageInfo';
  startCursor: Scalars['UUID'];
  endCursor: Scalars['UUID'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
}

export interface WidgetConnection {
   __typename?: 'WidgetConnection';
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<WidgetEdge>;
}

export interface Notification {
   __typename?: 'Notification';
  id: Scalars['UUID'];
  createdAt: Scalars['Time'];
  meta: Scalars['String'];
  receiver: User;
  origin: User;
}

export interface SetUserInfo {
  name: Scalars['String'];
  avatar: Scalars['String'];
  cover: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
  language: Scalars['String'];
  editorCursorColor: Scalars['String'];
}

export interface UpdateNotebook {
  notebookID: Scalars['UUID'];
  gitURL: Scalars['String'];
  gitBranch: Scalars['String'];
}

export interface NotificationEdge {
   __typename?: 'NotificationEdge';
  cursor: Scalars['UUID'];
  node: Notification;
}

export interface Stats {
   __typename?: 'Stats';
  numUsers: Scalars['Int'];
  numNotebooks: Scalars['Int'];
}

export enum NotebookOrderBy {
  TotalStarsCount = 'TOTAL_STARS_COUNT',
  DailyStarsCount = 'DAILY_STARS_COUNT',
  WeeklyStarsCount = 'WEEKLY_STARS_COUNT',
  MonthlyStarsCount = 'MONTHLY_STARS_COUNT'
}

export interface NotebookConnection {
   __typename?: 'NotebookConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<NotebookEdge>;
}

export interface DeleteNotification {
  notificationID: Scalars['UUID'];
}

export interface ReactionSummary {
   __typename?: 'ReactionSummary';
  count: Scalars['Int'];
  reaction: Scalars['String'];
  selfAuthored: Scalars['Boolean'];
}

export interface NotebookEdge {
   __typename?: 'NotebookEdge';
  cursor: Scalars['UUID'];
  node: Notebook;
}

export interface UpdateWidget {
  id: Scalars['UUID'];
  description: Scalars['String'];
  source: Scalars['String'];
}

export interface SignUpInput {
  /** Username */
  username: Scalars['String'];
  /** Email */
  email: Scalars['String'];
  /** Password */
  password: Scalars['String'];
}

export interface WidgetEdge {
   __typename?: 'WidgetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['UUID'];
  /** The item at the end of the edge. */
  node: Widget;
}
export interface Notebook {
   __typename?: 'Notebook';
  id: Scalars['UUID'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
  owner: User;
  gitURL: Scalars['String'];
  gitBranch: Scalars['String'];
  markdown: Scalars['String'];
  starsCount: Scalars['Int'];
  dailyStarsCount: Maybe<Scalars['Int']>;
  weeklyStarsCount: Maybe<Scalars['Int']>;
  monthlyStarsCount: Maybe<Scalars['Int']>;
  isStarred: Scalars['Boolean'];
}

export interface User {
   __typename?: 'User';
  id: Scalars['UUID'];
  name: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  verifiedEmail: Maybe<Scalars['String']>;
  avatar: Maybe<Scalars['String']>;
  cover: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['Time']>;
  updatedAt: Maybe<Scalars['Time']>;
  deletedAt: Maybe<Scalars['Time']>;
  followingsCount: Maybe<Scalars['Int']>;
  followersCount: Maybe<Scalars['Int']>;
  widgetsCount: Maybe<Scalars['Int']>;
  notebooksCount: Maybe<Scalars['Int']>;
  starredNotebooksCount: Maybe<Scalars['Int']>;
  isFollowing: Maybe<Scalars['Boolean']>;
  areFriends: Maybe<Scalars['Boolean']>;
  followings: Maybe<Array<User>>;
  followers: Maybe<Array<User>>;
  widgetSummaries: Array<UserWidget>;
  widgets: WidgetConnection;
  notifications: NotificationConnection;
  /** Get user owned notebooks */
  notebooks: NotebookConnection;
  /** Get user starred notebooks */
  starredNotebooks: NotebookConnection;
  editorCursorColor: Maybe<Scalars['String']>;
}


export interface UserWidgetsArgs {
  type: WidgetType;
  before?: Maybe<Scalars['UUID']>;
  after?: Maybe<Scalars['UUID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}


export interface UserNotificationsArgs {
  before?: Maybe<Scalars['UUID']>;
  after?: Maybe<Scalars['UUID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}


export interface UserNotebooksArgs {
  before?: Maybe<Scalars['UUID']>;
  after?: Maybe<Scalars['UUID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}


export interface UserStarredNotebooksArgs {
  before?: Maybe<Scalars['UUID']>;
  after?: Maybe<Scalars['UUID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}

export interface CreateWidget {
  type: WidgetType;
  description: Scalars['String'];
  source: Scalars['String'];
}

export interface DeleteWidget {
  id: Scalars['UUID'];
}

export interface Mutation {
   __typename?: 'Mutation';
  signUp: AuthReturn;
  signIn: AuthReturn;
  signUpWithGitHubAccount: AuthReturn;
  signInWithGitHubAccount: AuthReturn;
  deleteNotification: Scalars['Boolean'];
  deleteAllNotifications: Scalars['Boolean'];
  setUserInfo: User;
  updateNotebook: Notebook;
  starNotebook: Scalars['Boolean'];
  unstarNotebook: Scalars['Boolean'];
  createWidget: Widget;
  updateWidget: Scalars['Boolean'];
  deleteWidget: Scalars['Boolean'];
}


export interface MutationSignUpArgs {
  input: SignUpInput;
}

export interface MutationDeleteNotificationArgs {
  input: DeleteNotification;
}


export interface MutationSetUserInfoArgs {
  input: SetUserInfo;
}

export interface MutationUpdateNotebookArgs {
  input: UpdateNotebook;
}


export interface MutationStarNotebookArgs {
  input: StarNotebook;
}


export interface MutationUnstarNotebookArgs {
  input: UnstarNotebook;
}


export interface MutationCreateWidgetArgs {
  input: Maybe<CreateWidget>;
}


export interface MutationUpdateWidgetArgs {
  input: Maybe<UpdateWidget>;
}


export interface MutationDeleteWidgetArgs {
  input: Maybe<DeleteWidget>;
}

export interface UnfollowUser {
  userID: Scalars['UUID'];
}

export interface UnstarNotebook {
  notebookID: Scalars['UUID'];
}

export type UpdateNotebookMutationVariables = {
  notebookID: Scalars['UUID'];
  gitURL: Scalars['String'];
  gitBranch: Scalars['String'];
};


export type UpdateNotebookMutation = (
  { __typename?: 'Mutation' }
  & { updateNotebook: (
    { __typename?: 'Notebook' }
    & NotebookFieldsFragment
  ) }
);

export type StarNotebookMutationVariables = {
  notebookID: Scalars['UUID'];
};


export type StarNotebookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'starNotebook'>
);

export type UnstarNotebookMutationVariables = {
  notebookID: Scalars['UUID'];
};


export type UnstarNotebookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unstarNotebook'>
);

export type DeleteNotificationMutationVariables = {
  notificationID: Scalars['UUID'];
};


export type DeleteNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNotification'>
);

export type DeleteAllNotificationsMutationVariables = {};


export type DeleteAllNotificationsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAllNotifications'>
);

export type SetUserInfoMutationVariables = {
  cover: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  editorCursorColor: Scalars['String'];
};


export type SetUserInfoMutation = (
  { __typename?: 'Mutation' }
  & { setUserInfo: (
    { __typename?: 'User' }
    & ViewerFieldsFragment
  ) }
);

export type DeleteWidgetMutationVariables = {
  id: Scalars['UUID'];
};


export type DeleteWidgetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWidget'>
);

export type UpdateWidgetMutationVariables = {
  id: Scalars['UUID'];
  description: Scalars['String'];
  source: Scalars['String'];
};


export type UpdateWidgetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateWidget'>
);

export type NotebookFieldsFragment = (
  { __typename?: 'Notebook' }
  & Pick<Notebook, 'id' | 'createdAt' | 'updatedAt' | 'gitURL' | 'gitBranch' | 'markdown' | 'starsCount' | 'isStarred'>
  & { owner: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatar' | 'username'>
  ) }
);

export type NotebooksQueryVariables = {
  query?: Maybe<Scalars['String']>;
  orderBy?: Maybe<NotebookOrderBy>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
};


export type NotebooksQuery = (
  { __typename?: 'Query' }
  & { notebooks: Array<(
    { __typename?: 'Notebook' }
    & NotebookFieldsFragment
  )> }
);

export type NotificationsQueryVariables = {
  before: Scalars['UUID'];
  after: Scalars['UUID'];
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'User' }
    & { notifications: (
      { __typename?: 'NotificationConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges: Array<(
        { __typename?: 'NotificationEdge' }
        & Pick<NotificationEdge, 'cursor'>
        & { node: (
          { __typename?: 'Notification' }
        ) }
      )> }
    ) }
  ) }
);

export type PageInfoFieldsFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
);

export type ViewerFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'avatar' | 'bio' | 'cover' | 'createdAt' | 'deletedAt' | 'id' | 'language' | 'name' | 'username' | 'email' | 'verifiedEmail' | 'updatedAt' | 'widgetsCount' | 'notebooksCount' | 'starredNotebooksCount' | 'editorCursorColor'>
  & { notifications: (
    { __typename?: 'NotificationConnection' }
    & Pick<NotificationConnection, 'totalCount'>
  ) }
);

export type ViewerQueryVariables = {};


export type ViewerQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'User' }
    & ViewerFieldsFragment
  ) }
);

export const PageInfoFieldsFragmentDoc = gql`
    fragment PageInfoFields on PageInfo {
  startCursor
  endCursor
  hasNextPage
  hasPreviousPage
}
    `;

    export const NotebookFieldsFragmentDoc = gql`
    fragment NotebookFields on Notebook {
  id
  createdAt
  updatedAt
  owner {
    id
    avatar
    username
  }
  gitURL
  gitBranch
  markdown
  starsCount
  isStarred
}
    `;
export const NotificationFieldsFragmentDoc = gql`
    fragment NotificationFields on Notification {
  id
  createdAt
  origin {
    id
    username
    avatar
  }
  receiver {
    id
    username
    avatar
  }
  meta
}
    `;
export const ViewerFieldsFragmentDoc = gql`
    fragment ViewerFields on User {
  avatar
  bio
  cover
  createdAt
  deletedAt
  id
  language
  name
  username
  email
  verifiedEmail
  updatedAt
  widgetsCount
  notebooksCount
  starredNotebooksCount
  notifications(last: 1) {
    totalCount
  }
  editorCursorColor
}
    `;
export const SignUpDocument = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
  signUp(input: {username: $username, email: $email, password: $password}) {
    token
    user {
      id
    }
  }
}
    `;

    export const UpdateNotebookDocument = gql`
    mutation UpdateNotebook($notebookID: UUID!, $gitURL: String!, $gitBranch: String!) {
  updateNotebook(input: {notebookID: $notebookID, gitURL: $gitURL, gitBranch: $gitBranch}) {
    ...NotebookFields
  }
}
    ${NotebookFieldsFragmentDoc}`;

export const UpdateNotebookComponent = (props: Omit<Urql.MutationProps<UpdateNotebookMutation, UpdateNotebookMutationVariables>, 'query'> & { variables?: UpdateNotebookMutationVariables }) => (
  <Urql.Mutation {...props} query={UpdateNotebookDocument} />
);


export function useUpdateNotebookMutation() {
  return Urql.useMutation<UpdateNotebookMutation, UpdateNotebookMutationVariables>(UpdateNotebookDocument);
};
export const StarNotebookDocument = gql`
    mutation StarNotebook($notebookID: UUID!) {
  starNotebook(input: {notebookID: $notebookID})
}
    `;

export const StarNotebookComponent = (props: Omit<Urql.MutationProps<StarNotebookMutation, StarNotebookMutationVariables>, 'query'> & { variables?: StarNotebookMutationVariables }) => (
  <Urql.Mutation {...props} query={StarNotebookDocument} />
);


export function useStarNotebookMutation() {
  return Urql.useMutation<StarNotebookMutation, StarNotebookMutationVariables>(StarNotebookDocument);
};
export const UnstarNotebookDocument = gql`
    mutation UnstarNotebook($notebookID: UUID!) {
  unstarNotebook(input: {notebookID: $notebookID})
}
    `;

export const UnstarNotebookComponent = (props: Omit<Urql.MutationProps<UnstarNotebookMutation, UnstarNotebookMutationVariables>, 'query'> & { variables?: UnstarNotebookMutationVariables }) => (
  <Urql.Mutation {...props} query={UnstarNotebookDocument} />
);


export function useUnstarNotebookMutation() {
  return Urql.useMutation<UnstarNotebookMutation, UnstarNotebookMutationVariables>(UnstarNotebookDocument);
};
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($notificationID: UUID!) {
  deleteNotification(input: {notificationID: $notificationID})
}
    `;

export const DeleteNotificationComponent = (props: Omit<Urql.MutationProps<DeleteNotificationMutation, DeleteNotificationMutationVariables>, 'query'> & { variables?: DeleteNotificationMutationVariables }) => (
  <Urql.Mutation {...props} query={DeleteNotificationDocument} />
);


export function useDeleteNotificationMutation() {
  return Urql.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument);
};
export const DeleteAllNotificationsDocument = gql`
    mutation DeleteAllNotifications {
  deleteAllNotifications
}
    `;

export const DeleteAllNotificationsComponent = (props: Omit<Urql.MutationProps<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>, 'query'> & { variables?: DeleteAllNotificationsMutationVariables }) => (
  <Urql.Mutation {...props} query={DeleteAllNotificationsDocument} />
);


export function useDeleteAllNotificationsMutation() {
  return Urql.useMutation<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>(DeleteAllNotificationsDocument);
};
export const SetUserInfoDocument = gql`
    mutation SetUserInfo($cover: String!, $bio: String!, $location: String!, $language: String!, $name: String!, $avatar: String!, $editorCursorColor: String!) {
  setUserInfo(input: {cover: $cover, bio: $bio, location: $location, language: $language, name: $name, avatar: $avatar, editorCursorColor: $editorCursorColor}) {
    ...ViewerFields
  }
}
    ${ViewerFieldsFragmentDoc}`;

export const SetUserInfoComponent = (props: Omit<Urql.MutationProps<SetUserInfoMutation, SetUserInfoMutationVariables>, 'query'> & { variables?: SetUserInfoMutationVariables }) => (
  <Urql.Mutation {...props} query={SetUserInfoDocument} />
);


export function useSetUserInfoMutation() {
  return Urql.useMutation<SetUserInfoMutation, SetUserInfoMutationVariables>(SetUserInfoDocument);
};
export const DeleteWidgetDocument = gql`
    mutation DeleteWidget($id: UUID!) {
  deleteWidget(input: {id: $id})
}
    `;

export const DeleteWidgetComponent = (props: Omit<Urql.MutationProps<DeleteWidgetMutation, DeleteWidgetMutationVariables>, 'query'> & { variables?: DeleteWidgetMutationVariables }) => (
  <Urql.Mutation {...props} query={DeleteWidgetDocument} />
);


export function useDeleteWidgetMutation() {
  return Urql.useMutation<DeleteWidgetMutation, DeleteWidgetMutationVariables>(DeleteWidgetDocument);
};
export const UpdateWidgetDocument = gql`
    mutation UpdateWidget($id: UUID!, $description: String!, $source: String!) {
  updateWidget(input: {id: $id, description: $description, source: $source})
}
    `;

export const UpdateWidgetComponent = (props: Omit<Urql.MutationProps<UpdateWidgetMutation, UpdateWidgetMutationVariables>, 'query'> & { variables?: UpdateWidgetMutationVariables }) => (
  <Urql.Mutation {...props} query={UpdateWidgetDocument} />
);


export function useUpdateWidgetMutation() {
  return Urql.useMutation<UpdateWidgetMutation, UpdateWidgetMutationVariables>(UpdateWidgetDocument);
};

export const NotebooksDocument = gql`
    query Notebooks($query: String = "", $orderBy: NotebookOrderBy = TOTAL_STARS_COUNT, $page: Int = 0, $perPage: Int = 10) {
  notebooks(query: $query, orderBy: $orderBy, page: $page, perPage: $perPage) {
    ...NotebookFields
  }
}
    ${NotebookFieldsFragmentDoc}`;

export const NotebooksComponent = (props: Omit<Urql.QueryProps<NotebooksQuery, NotebooksQueryVariables>, 'query'> & { variables?: NotebooksQueryVariables }) => (
  <Urql.Query {...props} query={NotebooksDocument} />
);


export function useNotebooksQuery(options: Omit<Urql.UseQueryArgs<NotebooksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotebooksQuery>({ query: NotebooksDocument, ...options });
};
export const NotificationsDocument = gql`
    query Notifications($before: UUID!, $after: UUID!, $first: Int, $last: Int) {
  viewer {
    notifications(before: $before, after: $after, first: $first, last: $last) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        cursor
        node {
          ...NotificationFields
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${NotificationFieldsFragmentDoc}`;

export const NotificationsComponent = (props: Omit<Urql.QueryProps<NotificationsQuery, NotificationsQueryVariables>, 'query'> & { variables: NotificationsQueryVariables }) => (
  <Urql.Query {...props} query={NotificationsDocument} />
);


export function useNotificationsQuery(options: Omit<Urql.UseQueryArgs<NotificationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotificationsQuery>({ query: NotificationsDocument, ...options });
};
export const ViewerDocument = gql`
    query Viewer {
  viewer {
    ...ViewerFields
  }
}
    ${ViewerFieldsFragmentDoc}`;

export const ViewerComponent = (props: Omit<Urql.QueryProps<ViewerQuery, ViewerQueryVariables>, 'query'> & { variables?: ViewerQueryVariables }) => (
  <Urql.Query {...props} query={ViewerDocument} />
);


export function useViewerQuery(options: Omit<Urql.UseQueryArgs<ViewerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ViewerQuery>({ query: ViewerDocument, ...options });
};