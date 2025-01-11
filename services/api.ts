import axios from 'axios';
import { Stock } from '../types/stock';

const API_BASE_URL = 'https://stock-portfolio-backend-26r1.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const stockApi = {
  getAllStocks: async (): Promise<Stock[]> => {
    const response = await axiosInstance.get('/stocks');
    return response.data;
  },

  addStock: async (stock: Omit<Stock, 'id'>): Promise<Stock> => {
    console.log('Sending stock data:', stock);
    try {
      const response = await axiosInstance.post('/stocks', stock);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error in addStock:', error.response?.data || error.message);
      } else {
        console.error('Error in addStock:', error);
      }
      throw error;
    }
  },

  updateStock: async (ticker: string, stock: Partial<Stock>): Promise<Stock> => {
    const response = await axiosInstance.put(`/stocks/${ticker}`, stock);
    return response.data;
  },

  deleteStock: async (ticker: string): Promise<void> => {
    await axiosInstance.delete(`/stocks/${ticker}`);
  }
};

export const alphaVantageApi = {
  getStockInfo: async (ticker: string) => {
    // Your API call logic here
  },
  // Other methods...
}; 