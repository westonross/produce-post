// static/js/components/MarketTicker.jsx
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Papa from 'papaparse';

const MarketTicker = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using some agriculture/food related stocks as examples
  const symbols = ['CALM', 'TSN', 'ADM', 'KR'];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockPromises = symbols.map(async (symbol) => {
          const response = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/download/${symbol}?interval=1d&events=history&includeAdjustedClose=true`
          );
          const csvText = await response.text();
          const parsed = Papa.parse(csvText, { header: true });
          if (parsed.data && parsed.data[0]) {
            const todayData = parsed.data[0];
            const yesterdayData = parsed.data[1];
            return {
              symbol,
              price: Number(todayData.Close).toFixed(2),
              change: (Number(todayData.Close) - Number(yesterdayData.Close)).toFixed(2)
            };
          }
          return null;
        });

        const results = await Promise.all(stockPromises);
        setStockData(results.filter(Boolean));
        setLoading(false);
      } catch (err) {
        setError('Unable to fetch market data');
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 300000);
    return () => clearInterval(interval);
  }, []);

  const symbolNames = {
    'CALM': 'Cal-Maine Foods',
    'TSN': 'Tyson Foods',
    'ADM': 'Archer Daniels',
    'KR': 'Kroger'
  };

  if (loading) {
    return (
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-10 text-sm">
            Loading market data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-10 text-sm text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8 h-10 text-sm overflow-x-auto">
          {stockData.map((stock) => (
            <div key={stock.symbol} className="flex items-center space-x-2 whitespace-nowrap">
              <span className="font-medium">{symbolNames[stock.symbol]}</span>
              <span>${stock.price}</span>
              <span className={Number(stock.change) >= 0 ? 'text-green-600' : 'text-red-600'}>
                {Number(stock.change) >= 0 ? '+' : ''}{stock.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mount the component
const container = document.getElementById('market-ticker');
const root = createRoot(container);
root.render(<MarketTicker />);