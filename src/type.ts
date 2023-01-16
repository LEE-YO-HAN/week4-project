// event type
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

// state type
export type InitState = {
  comments: UpdateData[];
  isLoading: boolean;
  error: any;
  maxDataLength: number;
};

export type getCommentData = UpdateData[];

export type FormData = AddData | UpdateData;

export type AddData = {
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
};

export type UpdateData = {
  id: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
};
