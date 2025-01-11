import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import StarBorder from '@/components/ui/StarBorder';
import { stockApi } from '../services/api';
import { Stock } from '../types/stock';
import axios from 'axios';

const Watchlist: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
  });
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<any[]>([]); // For autocomplete suggestions

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await stockApi.getAllStocks();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'name' || name === 'ticker') {
      try {
        const response = await axios.get(`/api/stocks/search?keyword=${value}`);
        setSuggestions(response.data.bestMatches || []);
      } catch (error) {
        console.error('Error fetching stock suggestions:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log

    try {
      if (!formData.name || !formData.ticker || !formData.quantity || !formData.buyPrice) {
        console.log('Missing form data:', formData); // Debug log
        return;
      }

      const stockData = {
        name: formData.name.toUpperCase(),
        ticker: formData.ticker.toUpperCase(),
        quantity: parseInt(formData.quantity),
        buyPrice: parseFloat(formData.buyPrice),
        currentPrice: parseFloat(formData.buyPrice) // Assuming current price is the same as buy price initially
      };
      
      console.log('Sending stock data:', stockData); // Debug log

      if (editingStock) {
        await stockApi.updateStock(editingStock.ticker, stockData);
        console.log('Stock updated');
      } else {
        const response = await stockApi.addStock(stockData);
        console.log('Stock added:', response);
      }
      
      await fetchStocks();
      setFormData({ name: '', ticker: '', quantity: '', buyPrice: '' });
      setEditingStock(null);

      // Notify dashboard
      const event = new CustomEvent('stocksUpdated');
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Error saving stock: An unexpected error occurred');
    }
  };

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock);
    setFormData({
      name: stock.name,
      ticker: stock.ticker,
      quantity: stock.quantity.toString(),
      buyPrice: stock.buyPrice.toString(),
    });
  };

  const handleDelete = async (ticker: string) => {
    try {
      await stockApi.deleteStock(ticker);
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  const calculateProfit = (stock: Stock) => {
    const profit = (stock.currentPrice - stock.buyPrice) * stock.quantity;
    return profit.toFixed(2);
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-md shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Watchlist</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Stock Name"
            className="border rounded-md px-3 py-2 bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="ticker"
            value={formData.ticker}
            onChange={handleInputChange}
            placeholder="Ticker"
            className="border rounded-md px-3 py-2 bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white text-black rounded-md shadow-lg mt-1">
              {suggestions.map((suggestion) => (
                <li key={suggestion['1. symbol']} className="p-2 hover:bg-gray-200 cursor-pointer">
                  {suggestion['2. name']} ({suggestion['1. symbol']})
                </li>
              ))}
            </ul>
          )}
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border rounded-md px-3 py-2 bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            name="buyPrice"
            value={formData.buyPrice}
            onChange={handleInputChange}
            placeholder="Buy Price"
            className="border rounded-md px-3 py-2 bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          {editingStock ? 'Update Stock' : 'Add Stock'}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Ticker</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Buy Price</th>
              <th className="py-2 px-4 border-b">Current Price</th>
              <th className="py-2 px-4 border-b">Profit/Loss</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <motion.tr
                key={stock.ticker}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b">{stock.name}</td>
                <td className="py-2 px-4 border-b">{stock.ticker}</td>
                <td className="py-2 px-4 border-b">{stock.quantity}</td>
                <td className="py-2 px-4 border-b">${stock.buyPrice.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">${stock.currentPrice.toFixed(2)}</td>
                <td className={`py-2 px-4 border-b ${Number(calculateProfit(stock)) >= 0 ? 'text-green-500' : 'text-red-500'} group-hover:text-gray-900`}>
                  ${calculateProfit(stock)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(stock)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <Edit2Icon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(stock.ticker)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;

