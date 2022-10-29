import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

export const { API_URL } = process.env;
export const API_URL_NODE: string = 'https://appnode-server.herokuapp.com/api/';
export const USER: string = 'APPLICATION_USER';

const getClientInstance = (token?: string, apiUrl?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const instance = axios.create({
    baseURL: apiUrl || API_URL_NODE,
    headers,
    insecureHTTPParser: process.env.NODE_ENV === 'development' ? true : undefined,
  });

  instance.interceptors.request.use(request => {
    request.headers = {
      ...request.headers,
      requestTraceId: uuidV4(),
    };
    return request;
  });

  return instance;
};

export default getClientInstance;
