// apiClient.ts
import axios from 'axios';

const nextBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchData = async <T>(endpoint: string, options: any = {}): Promise<T> => {
  try {
    const response = await axios.get(`${nextBaseUrl}${endpoint}`, options);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching from API:', error.response?.data || error.message);
    throw error;
  }
};

const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await axios.post(`${nextBaseUrl}${endpoint}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error posting to API:', error.response?.data || error.message);
    throw error;
  }
};

const putData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await axios.put(`${nextBaseUrl}${endpoint}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error putting to API:', error.response?.data || error.message);
    throw error;
  }
};

const deleteData = async <T>(endpoint: string, data?: any): Promise<T> => {
  try {
    const response = await axios.delete(`${nextBaseUrl}${endpoint}`, { data });
    return response.data;
  } catch (error: any) {
    console.error('Error deleting from API:', error.response?.data || error.message);
    throw error;
  }
};

export { fetchData, postData, putData, deleteData };
