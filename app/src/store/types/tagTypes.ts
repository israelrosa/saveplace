import { AxiosError } from 'axios';

export const types: { [id: string]: string } = {
  GET_TAGS_REQUEST: 'GET_TAGS_REQUEST',
  GET_TAGS_SUCCESS: 'GET_TAGS_SUCCESS',
  GET_TAGS_FAILURE: 'GET_TAGS_FAILURE',
};

interface Tag {
  id: string;
  name: string;
}

export interface TagStore {
  data: Tag[];
  isLoading: boolean;
  error?: AxiosError;
}
