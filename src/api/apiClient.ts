import { ApiRequestData } from 'src/types';

// apiClient.ts
// const API_BASE_URL = 'http://127.0.0.1:8000';
const API_BASE_URL = import.meta.env.VITE_RAPID_RAG_URL;

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | ApiRequestData;
}

const apiClient = async (endpoint: string, { body, ...customConfig }: FetchOptions = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    },
    body: body ? JSON.stringify(body) : null
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText || 'Error fetching data');
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message)); // Wrap the string message in an Error object
    }
    return Promise.reject(new Error('An unknown error occurred')); // Make sure to always reject with an Error object
  }
};

export default apiClient;
