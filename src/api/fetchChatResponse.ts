/* eslint-disable */
import { ApiRequestData } from '../types';

// const CHAT_SERVICE_URL = import.meta.env.VITE_RAPID_RAG_URL;

export const fetchChatResponse = async (requestData: ApiRequestData, handleDataChunk: (chunk: string) => void): Promise<void> => {
  // const API_URL = `${CHAT_SERVICE_URL}/get_rag_response/room123/user123`; // Adjust this URL as needed
  // const API_URL = `http://127.0.0.1:8000/get_rag_response/room123/user123`; // Adjust this URL as needed
  const API_URL = `http://127.0.0.1:8000/hrmp/rag/stream`; // Adjust this URL as needed
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      const processBuffer = () => {
        let pos = 0; // Position in buffer
        // Process the buffer and try to extract JSON objects
        while (pos < buffer.length) {
          if (buffer[pos] === '{') {
            let depth = 0;
            for (let i = pos; i < buffer.length; i++) {
              if (buffer[i] === '{') {
                depth++;
              } else if (buffer[i] === '}') {
                depth--;
                if (depth === 0) {
                  // A complete JSON object
                  const completeObject = buffer.substring(pos, i + 1);
                  handleDataChunk(completeObject);
                  pos = i + 1;
                  break;
                }
              }
            }
            if (depth !== 0) {
              break; // If depth != 0, then it's not complete
            }
          } else {
            pos++;
          }
        }
        buffer = buffer.slice(pos); // Keep the incomplete part in buffer
      };

      const readStream = async (): Promise<void> => {
        let done;
        let value;
        while (true) {
          ({ done, value } = await reader.read());
          if (done) {
            if (buffer.trim()) {
              processBuffer(); // Process remaining buffer
            }
            break;
          }
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          processBuffer(); // Process each time buffer is updated
        }
      };

      await readStream();
    }
  } catch (error) {
    console.error('Failed to stream data:', error);
    throw new Error('Failed to stream data');
  }
};
