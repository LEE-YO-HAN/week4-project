export type dataValue = string;

//Redux type

export type InitState = {
  comments: UpdateData[];
  isLoading: boolean;
  error: any;
};

export type AddData = {
  imageUrl: string;
  name: string;
  content: string;
  createAt: string;
};

export type UpdateData = {
  id: number;
  imageUrl: string;
  name: string;
  content: string;
  createAt: string;
};
