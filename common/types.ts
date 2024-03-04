export enum PINS_TYPES {
    ARTICLES = 'articles',
    COMPANIES = 'companies',
    JOBS = 'jobs',
    USER = 'users',
    POSTS = 'posts',
    LINKS = 'links',
  }

export enum MODAL_TYPES_DATA {
    USER= 'App\\Models\\User',
    COMPANY= 'App\\Models\\Company',
}

export type IUpVote = {
  upvoter_id: string;
  upvoter_type: string;
};
export enum UPVOTER_TYPES {
  USERS = 'users',
  COMPANIES = 'companies',
}

export enum CREATOR_TYPE {
  COMPANIES = 'companies',
}

export enum COMMENTER_TYPE {
  COMPANIES = 'companies',
}
export enum CONTENT_TYPE {
  ARTICLES = 'articles',
  POSTS = 'posts',
  LINKS = 'links',
}

export enum JOB_VIEW_TYPE {
  JOB = 'job',
  APPLICATIONS = 'applicants',
  MESSAGES = 'messages',
  SOURCING = 'recommendations',
}

export enum CONVERSATION_VIEW_TYPE {
  REGULAR = 0,
  JOB = 1,
}

export enum CREATE_CARD_WIZARD_TYPE {
  USER= 'user',
  ARTICLE= 'article',
  JOB= 'job',
  COMPANY = 'company',
}
