import { AxiosError } from 'axios';

export const types: { [id: string]: string } = {
  GET_QUEUES_REQUEST: 'GET_QUEUES_REQUEST',
  GET_QUEUES_SUCCESS: 'GET_QUEUES_SUCCESS',
  GET_QUEUES_FAILURE: 'GET_QUEUES_FAILURE',

  GET_USER_QUEUES_REQUEST: 'GET_USER_QUEUES_REQUEST',
  GET_USER_QUEUES_SUCCESS: 'GET_USER_QUEUES_SUCCESS',
  GET_USER_QUEUES_FAILURE: 'GET_USER_QUEUES_FAILURE',

  GET_QUEUE_REQUEST: 'GET_QUEUE_REQUEST',
  GET_QUEUE_SUCCESS: 'GET_QUEUE_SUCCESS',
  GET_QUEUE_FAILURE: 'GET_QUEUE_FAILURE',

  CREATE_QUEUE_REQUEST: 'CREATE_QUEUE_REQUEST',
  CREATE_QUEUE_SUCCESS: 'CREATE_QUEUE_SUCCESS',
  CREATE_QUEUE_FAILURE: 'CREATE_QUEUE_FAILURE',

  DELETE_QUEUE_REQUEST: 'DELETE_QUEUE_REQUEST',
  DELETE_QUEUE_SUCCESS: 'DELETE_QUEUE_SUCCESS',
  DELETE_QUEUE_FAILURE: 'DELETE_QUEUE_FAILURE',
};

interface Queue {
  name: string;
  currentCode: number;
  status: string;
  tagId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  nextClient: string;
  previousClient: string;
  waitingTimeMinutes: string;
}

export interface UserStore {
  queueDetail: Queue;
  userQueues: Queue[];
  publicQueues: Queue[];
  isLoading: boolean;
  error?: AxiosError;
}
