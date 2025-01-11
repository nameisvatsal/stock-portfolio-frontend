import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InfoIcon, TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react';
import StarBorder from './ui/StarBorder';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { stockApi } from '../services/api';
import { Stock } from '../types/stock';
import axios from 'axios';
import { rateLimitedRequest } from '../services/rateLimitedRequest';
import { alphaVantageApi } from '../services/api';

interface DashboardProps {
  isLoggedIn: boolean;
}

interface ChartDataItem {
  name: string;
  value: number;
  quantity: number;
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn }) => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    dailyChange: 0,
    totalGainLoss: 0,
    numberOfStocks: 0,
    dailyChangePercent: 0
  });
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    let message = 'An error occurred';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  useEffect(() => {
    const updatePrices = async () => {
      try {
        const stocks = await stockApi.getAllStocks();
        const updatedStocks = await Promise.all(
          stocks.map(async (stock: Stock) => {
            const stockInfo = await rateLimitedRequest(() => 
              alphaVantageApi.getStockInfo(stock.ticker)
            );
            return {
              ...stock,
              currentPrice: stockInfo?.currentPrice || stock.currentPrice,
              dailyChange: stockInfo?.change || 0,
              changePercent: stockInfo?.changePercent || 0
            };
          })
        );
        
        const totalValue = updatedStocks.reduce((sum, stock) => 
          sum + (stock.quantity * stock.currentPrice), 0);
        
        const totalGainLoss = updatedStocks.reduce((sum, stock) => 
          sum + (stock.quantity * (stock.currentPrice - stock.buyPrice)), 0);

        const dailyChange = updatedStocks.reduce((sum, stock) => 
          sum + (stock.quantity * (stock.dailyChange || 0)), 0);

        const dailyChangePercent = (dailyChange / totalValue) * 100;

        setChartData(updatedStocks.map(stock => ({
          name: stock.name,
          value: stock.quantity * stock.currentPrice,
          quantity: stock.quantity
        })));

        setPortfolioData({
          totalValue,
          dailyChange,
          totalGainLoss,
          numberOfStocks: updatedStocks.length,
          dailyChangePercent
        });
      } catch (error) {
        console.error('Error updating prices:', error);
      }
    };

    updatePrices();
    const interval = setInterval(updatePrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const stocks = await stockApi.getAllStocks();
      
      // Calculate portfolio metrics
      const totalValue = stocks.reduce((sum: number, stock: Stock) => 
        sum + (stock.quantity * stock.currentPrice), 0);
      
      // Transform stocks data for chart
      const chartData = stocks.map((stock: Stock) => ({
        name: stock.name,
        value: stock.quantity * stock.currentPrice,
        quantity: stock.quantity
      }));

      setChartData(chartData);
      
      setPortfolioData({
        totalValue,
        dailyChange: 0,
        totalGainLoss: stocks.reduce((sum: number, stock: Stock) => 
          sum + (stock.quantity * (stock.currentPrice - stock.buyPrice)), 0),
        numberOfStocks: stocks.length,
        dailyChangePercent: 0
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to view your dashboard.</div>;
  }
  
  const portfolioMetrics = [
    { 
      label: 'Total Value', 
      value: `$${portfolioData.totalValue.toLocaleString()}`, 
      change: '+2.5%', 
      icon: <DollarSign className="w-6 h-6 text-primary" /> 
    },
    { label: 'Daily Change', value: '+$1,250', change: '+1.01%', icon: <TrendingUp className="w-6 h-6 text-primary" /> },
    { label: 'Total Gain/Loss', value: '+$25,000', change: '+25%', icon: <BarChart2 className="w-6 h-6 text-primary" /> },
    { label: 'Number of Stocks', value: '15', change: '0', icon: <TrendingDown className="w-6 h-6 text-gray-500" /> },
  ];

  const chartConfig = {
    stocks: {
      label: 'Stocks',
      color: 'hsl(var(--primary))',
    },
    bonds: {
      label: 'Bonds',
      color: 'hsl(var(--secondary))',
    },
    cash: {
      label: 'Cash',
      color: 'hsl(var(--accent))',
    },
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-md shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-primary text-center">Portfolio Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {portfolioMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-100">{metric.label}</h3>
              {metric.icon}
            </div>
            <p className="text-2xl font-bold text-white">{metric.value}</p>
            <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {metric.change}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-100">Portfolio Allocation</h3>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: 'white' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="value" fill="var(--color-stocks)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      <div className="text-center">
        <StarBorder
          as="button"
          color="rgba(34, 197, 94, 0.5)"
          speed="5s"
          className="mx-auto"
        >
          View Detailed Report
        </StarBorder>
      </div>
    </div>
  );
};

export default Dashboard;

