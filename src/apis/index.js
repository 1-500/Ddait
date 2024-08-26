import { DEV_API_URL } from '@env';
import axios from 'axios';

export const API = axios.create({
  baseURL: DEV_API_URL,
  timeout: 7000,
  headers: {
    'Content-type': 'Application/json',
    Accept: 'Application/json',
  }, // headers에는 어떤게 들어가야할지 궁금하네요
});
