export enum IInteractionTypes {
  ViewCard = 'view card',
  ViewPage = 'view page',
  Save = 'save',
  Follow = 'follow',
  Message = 'message',
  Like = 'like',
  Upvote = 'upvote',
  comments = 'comment',
  apply = 'apply',
  share = 'share',
}
export enum IInteractionItemTypes {
  users = 'users',
  companies = 'companies',
  articles = 'articles',
  jobs = 'jobs',
  posts = 'posts',
  links = 'links',
}

export enum IInteractionEventValueType {
  brandTab = '1',
  resumeTab = '2',
  contentTab = '2',
  viewFirstCard = '1',
  viewSecondCard = '2',
  viewThirdCard = '3',
  companyContentTab = '2',
  companyJobsTab = '2',
  companyInsightsTab = '2',
  viewComment = '1',
  postComment = '2',
}
export enum IInteractorTypes {
  users = 'users',
  companies = 'companies',
}

export type ISaveInteractionPayloadAPI = {
  item_id: string,
  item_type: IInteractionItemTypes,
  event_type: IInteractionTypes,
  event_value?: IInteractionEventValueType | number;
  interactor_type?: IInteractorTypes;
  interactor_id?: string;
};
export type ISaveInteractionPayload = {
  itemId: string;
  itemType: IInteractionItemTypes;
  eventType: IInteractionTypes;
  eventValue?: IInteractionEventValueType | number;
  interactorType?: IInteractorTypes;
};
