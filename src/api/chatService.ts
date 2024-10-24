// chatService.ts
import apiClient from './apiClient';
import { ApiRequestData, ApiResponse } from '../types'; // Ensure these types are correctly defined

export const fetchChatResponse = async (requestData: ApiRequestData): Promise<ApiResponse> => {
  try {
    const response = await apiClient('/get_rag_response/room123/user123', {
      method: 'POST',
      body: requestData
    });
    return response as ApiResponse; // Type assertion to conform with the expected return type
  } catch (error) {
    // console.error('Failed to fetch chat response:', error);
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
