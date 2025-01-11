// src/components/Stocks.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the TypeScript type for stock data
interface Stock {
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

const Stocks: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);  // Type the state as an array of Stock
  const [loading, setLoading] = useState<boolean>(true);  // Boolean for loading state

  // Fetch stock data from the backend API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/stocks')  // Adjust URL based on your backend setup
      .then((response) => {
        setStocks(response.data);  // Update the state with fetched stock data
        setLoading(false);  // Update loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching stock data', error);
        setLoading(false);  // Stop loading even in case of error
      });
  }, []);  // Empty dependency array to fetch once when the component mounts

  if (loading) {
    return <div className="text-center py-4">Loading stocks...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Stock Portfolio</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Stock Name</th>
              <th className="py-2 px-4 border-b">Ticker</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Buy Price</th>
              <th className="py-2 px-4 border-b">Current Price</th>
              <th className="py-2 px-4 border-b">Value</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{stock.name}</td>
                <td className="py-2 px-4 border-b">{stock.ticker}</td>
                <td className="py-2 px-4 border-b">{stock.quantity}</td>
                <td className="py-2 px-4 border-b">{stock.buyPrice}</td>
                <td className="py-2 px-4 border-b">{stock.currentPrice}</td>
                <td className="py-2 px-4 border-b">
                  {(stock.quantity * stock.currentPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
