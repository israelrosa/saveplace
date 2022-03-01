import { AxiosError } from 'axios';
import { User } from './userTypes';

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

  GET_CURRENT_QUEUE_REQUEST: 'GET_CURRENT_QUEUE_REQUEST',
  GET_CURRENT_QUEUE_SUCCESS: 'GET_CURRENT_QUEUE_SUCCESS',
  GET_CURRENT_QUEUE_FAILURE: 'GET_CURRENT_QUEUE_FAILURE',

  CREATE_QUEUE_REQUEST: 'CREATE_QUEUE_REQUEST',
  CREATE_QUEUE_SUCCESS: 'CREATE_QUEUE_SUCCESS',
  CREATE_QUEUE_FAILURE: 'CREATE_QUEUE_FAILURE',

  DELETE_QUEUE_REQUEST: 'DELETE_QUEUE_REQUEST',
  DELETE_QUEUE_SUCCESS: 'DELETE_QUEUE_SUCCESS',
  DELETE_QUEUE_FAILURE: 'DELETE_QUEUE_FAILURE',
};

interface Queue {
  id: string;
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
  user: User
}

interface QueueClient {
  id: string;
  code: number;
  status: string;
  queueId: string;
  userId: string;
  attendedOn: Date;
  queue: Queue;
}

export interface UserStore {
  currentQueue: QueueClient;
  queueDetail: Queue;
  userQueues: Queue[];
  publicQueues: Queue[];
  isLoading: boolean;
  error?: AxiosError;
}
