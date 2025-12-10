import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { LockClosedIcon, TrendingUpIcon, ExclamationTriangleIcon, ShoppingCartIcon, HomeIcon, ChartBarIcon, LogoutIcon, SparklesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import * as tf from '@tensorflow/tfjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Enhanced Login Component
function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      setUser({ email });
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass-dark rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">StockTrader</h2>
            <p className="text-blue-100 text-sm mt-2">AI-Powered Stock Trading</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 rounded-lg bg-slate-700 border-2 text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                  focusedField === 'email' ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-slate-600'
                }`}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-slate-300 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 rounded-lg bg-slate-700 border-2 text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                  focusedField === 'password' ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-slate-600'
                }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-button text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LockClosedIcon className="h-5 w-5" />
                  <span>Login</span>
                </>
              )}
            </button>

            <p className="text-center mt-6 text-slate-400 text-sm">
              Demo Mode • Any credentials work
            </p>
          </form>
        </div>

        <div className="mt-8 text-center text-slate-400 text-xs">
          <p>🔐 Secure Trading Platform</p>
        </div>
      </div>
    </div>
  );
}

// Enhanced Navbar
function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
    { icon: ChartBarIcon, label: 'Portfolio', href: '/portfolio' },
    { icon: ShoppingCartIcon, label: 'Buy/Sell', href: '/buy-sell' },
  ];

  return (
    <nav className="glass-dark border-b border-slate-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-bold gradient-text">StockTrader</h1>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-all duration-200"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// Enhanced Dashboard Component
function Dashboard({ user, stocks, model }) {
  const [predictions, setPredictions] = useState({});
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Portfolio Value',
        data: [10000, 10500, 10200, 10800, 11200, 11500],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      }],
    });
  }, []);

  useEffect(() => {
    if (!model) return;
    const predictPrices = async () => {
      const preds = {};
      for (const [symbol, data] of Object.entries(stocks)) {
        const currentPrice = parseFloat(data['05. price']) || 0;
        if (!currentPrice) {
          preds[symbol] = 0;
          continue;
        }
        try {
          const histResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_KEY}&outputsize=compact`);
          const histData = await histResponse.json();
          const timeSeries = histData['Time Series (Daily)'] || {};
          const prices = Object.values(timeSeries).slice(0, 30).map(d => parseFloat(d['4. close'])).filter(p => !isNaN(p));
          if (prices.length === 0) {
            preds[symbol] = currentPrice * 1.05;
            continue;
          }
          const input = tf.tensor2d([prices.slice(0, 1)], [1, 1]);
          const pred = model.predict(input);
          const predictedPrice = pred.dataSync()[0] * (currentPrice / (prices[0] || currentPrice));
          preds[symbol] = predictedPrice;
          input.dispose();
          pred.dispose();
        } catch (err) {
          console.error(`Prediction failed for ${symbol}:`, err);
          preds[symbol] = currentPrice * 1.05;
        }
      }
      setPredictions(preds);
    };
    predictPrices();
  }, [stocks, model]);

  const getPredictionColor = (current, predicted) => predicted > current ? 'text-green-400' : 'text-red-400';
  const getTrendIcon = (current, predicted) => predicted > current ? <ArrowTrendingUpIcon className="h-5 w-5" /> : <ArrowTrendingDownIcon className="h-5 w-5" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8 animate-slide-in-left">
          <h1 className="text-4xl font-bold text-white flex items-center space-x-3 mb-2">
            <TrendingUpIcon className="h-10 w-10 text-blue-500" />
            <span>Market Dashboard</span>
          </h1>
          <p className="text-slate-400">Real-time stock analysis with AI predictions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(stocks).map(([symbol, data], idx) => (
            <div
              key={symbol}
              className="glass-dark card-hover card-shadow rounded-xl p-6 border border-slate-700 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold gradient-text">{symbol}</h3>
                  <p className="text-slate-400 text-sm">Stock Quote</p>
                </div>
                <SparklesIcon className="h-6 w-6 text-blue-400" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Current Price</span>
                  <span className="text-2xl font-bold text-white">${data['05. price'] || 'N/A'}</span>
                </div>

                <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">AI Prediction</span>
                  <span className={`text-xl font-semibold flex items-center space-x-1 ${getPredictionColor(parseFloat(data['05. price']), predictions[symbol])}`}>
                    <span>${predictions[symbol]?.toFixed(2) || 'Loading...'}</span>
                    {predictions[symbol] && getTrendIcon(parseFloat(data['05. price']), predictions[symbol])}
                  </span>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3 flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${predictions[symbol] && predictions[symbol] > parseFloat(data['05. price']) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm text-slate-300">
                    Trend: {predictions[symbol] && predictions[symbol] > parseFloat(data['05. price']) ? '📈 Bullish' : '📉 Bearish'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-dark card-shadow rounded-xl p-6 border border-slate-700 animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <ChartBarIcon className="h-6 w-6 text-blue-500" />
            <span>Portfolio Performance</span>
          </h2>
          <div className="bg-slate-800 rounded-lg p-4">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: 'rgb(148, 163, 184)' },
                  },
                },
                scales: {
                  y: {
                    ticks: { color: 'rgb(148, 163, 184)' },
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                  },
                  x: {
                    ticks: { color: 'rgb(148, 163, 184)' },
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Portfolio Component
function Portfolio({ user, portfolio, balance, model }) {
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    if (!model || portfolio.length === 0) return;
    const predictPortfolio = async () => {
      const preds = {};
      for (const stock of portfolio) {
        try {
          const input = tf.tensor2d([[stock.avgPrice]], [1, 1]);
          const pred = model.predict(input);
          preds[stock.stockSymbol] = pred.dataSync()[0];
          input.dispose();
          pred.dispose();
        } catch (err) {
          console.error(`Prediction failed for ${stock.stockSymbol}:`, err);
          preds[stock.stockSymbol] = stock.avgPrice * 1.05;
        }
      }
      setPredictions(preds);
    };
    predictPortfolio();
  }, [portfolio, model]);

  const totalValue = portfolio.reduce((sum, stock) => sum + (stock.quantity * stock.avgPrice), 0);
  const totalGain = totalValue - balance;
  const gainPercentage = ((totalGain / balance) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 animate-slide-in-left">Your Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark card-shadow rounded-xl p-6 border border-slate-700 animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">Available Balance</p>
                <h3 className="text-3xl font-bold text-white">${balance.toFixed(2)}</h3>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="glass-dark card-shadow rounded-xl p-6 border border-slate-700 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">Portfolio Value</p>
                <h3 className="text-3xl font-bold text-blue-400">${totalValue.toFixed(2)}</h3>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="glass-dark card-shadow rounded-xl p-6 border border-slate-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">Total Gain/Loss</p>
                <h3 className={`text-3xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalGain >= 0 ? '+' : ''}{totalGain.toFixed(2)} ({gainPercentage}%)
                </h3>
              </div>
              {totalGain >= 0 ? <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" /> : <ArrowTrendingDownIcon className="h-8 w-8 text-red-500" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.length > 0 ? (
            portfolio.map((stock, idx) => (
              <div
                key={idx}
                className="glass-dark card-hover card-shadow rounded-xl p-6 border border-slate-700 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text">{stock.stockSymbol}</h3>
                    <p className="text-slate-400 text-sm">Holdings</p>
                  </div>
                  <SparklesIcon className="h-6 w-6 text-blue-400" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quantity</span>
                    <span className="text-white font-semibold">{stock.quantity} shares</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Price</span>
                    <span className="text-white font-semibold">${stock.avgPrice.toFixed(2)}</span>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">AI Prediction</span>
                    <span className="text-blue-400 font-semibold">${predictions[stock.stockSymbol]?.toFixed(2) || 'Loading...'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Value</span>
                    <span className="text-green-400 font-bold">${(stock.quantity * stock.avgPrice).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 glass-dark rounded-xl p-12 border border-slate-700 text-center">
              <ShoppingCartIcon className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No stocks in portfolio</p>
              <p className="text-slate-500 text-sm">Go to Buy/Sell to add stocks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced BuySell Component
function BuySell({ user, portfolio, setPortfolio, balance, setBalance }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [type, setType] = useState('buy');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symbol.trim() || !quantity || parseInt(quantity) <= 0) {
      alert('Please enter valid symbol and quantity');
      return;
    }

    const price = 150;
    const qty = parseInt(quantity);
    const cost = price * qty;

    if (type === 'buy') {
      if (balance >= cost) {
        setBalance(balance - cost);
        const existing = portfolio.find(p => p.stockSymbol === symbol.toUpperCase());
        if (existing) {
          existing.quantity += qty;
          setPortfolio([...portfolio]);
        } else {
          setPortfolio([...portfolio, { stockSymbol: symbol.toUpperCase(), quantity: qty, avgPrice: price }]);
        }
        alert(`✅ Bought ${qty} shares of ${symbol.toUpperCase()} successfully!`);
      } else {
        alert('❌ Insufficient balance!');
      }
    } else if (type === 'sell') {
      const existing = portfolio.find(p => p.stockSymbol === symbol.toUpperCase());
      if (existing && existing.quantity >= qty) {
        existing.quantity -= qty;
        if (existing.quantity === 0) {
          setPortfolio(portfolio.filter(p => p.stockSymbol !== symbol.toUpperCase()));
        } else {
          setPortfolio([...portfolio]);
        }
        setBalance(balance + cost);
        alert(`✅ Sold ${qty} shares of ${symbol.toUpperCase()} successfully!`);
      } else {
        alert('❌ Insufficient shares!');
      }
    }

    setSymbol('');
    setQuantity('1');
  };

  const totalCost = 150 * (parseInt(quantity) || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center space-x-3 animate-slide-in-left">
          <ShoppingCartIcon className="h-10 w-10 text-blue-500" />
          <span>Trade Stocks</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-dark card-shadow rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <CurrencyDollarIcon className="h-5 w-5 text-blue-500" />
              <p className="text-slate-400">Current Balance</p>
            </div>
            <h3 className="text-3xl font-bold text-white">${balance.toFixed(2)}</h3>
          </div>

          <div className="glass-dark card-shadow rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUpIcon className="h-5 w-5 text-blue-500" />
              <p className="text-slate-400">Mock Price</p>
            </div>
            <h3 className="text-3xl font-bold text-white">$150.00</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-dark card-shadow rounded-xl p-8 border border-slate-700 animate-fade-in">
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-semibold mb-3">Transaction Type</label>
            <div className="flex space-x-4">
              {['buy', 'sell'].map((txType) => (
                <button
                  key={txType}
                  type="button"
                  onClick={() => setType(txType)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    type === txType
                      ? 'gradient-button text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {txType === 'buy' ? <PlusIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
                  <span className="capitalize">{txType}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-semibold mb-3">Stock Symbol</label>
            <input
              type="text"
              placeholder="e.g., AAPL, GOOGL, TSLA"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onFocus={() => setFocusedField('symbol')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-lg bg-slate-700 border-2 text-white placeholder-slate-400 focus:outline-none transition-all duration-300 uppercase tracking-wider ${
                focusedField === 'symbol' ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-slate-600'
              }`}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-semibold mb-3">Quantity</label>
            <input
              type="number"
              placeholder="Number of shares"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onFocus={() => setFocusedField('quantity')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-lg bg-slate-700 border-2 text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                focusedField === 'quantity' ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-slate-600'
              }`}
              min="1"
              required
            />
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 mb-6 border border-blue-500/30">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Cost</span>
              <span className="text-2xl font-bold gradient-text">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full gradient-button text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
          >
            {type === 'buy' ? (
              <>
                <PlusIcon className="h-6 w-6" />
                <span>Buy Stock</span>
              </>
            ) : (
              <>
                <MinusIcon className="h-6 w-6" />
                <span>Sell Stock</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState({});
  const [model, setModel] = useState(null);
  const [portfolio, setPortfolio] = useState([{ stockSymbol: 'AAPL', quantity: 10, avgPrice: 150 }]);
  const [balance, setBalance] = useState(10000);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        setModel(loadedModel);
      } catch (err) {
        console.error('Model loading failed (using mock):', err);
        setModel(true);
      }
    };
    loadModel();
  }, []);

  useEffect(() => {
    const fetchStocks = async () => {
      const symbols = ['AAPL', 'GOOGL', 'TSLA'];
      const data = {};
      for (const sym of symbols) {
        try {
          const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_KEY}`);
          const result = await response.json();
          data[sym] = result['Global Quote'] || { '05. price': Math.random() * 300 + 50 };
        } catch (err) {
          console.error(`Failed to fetch ${sym}:`, err);
          data[sym] = { '05. price': Math.random() * 300 + 50 };
        }
      }
      setStocks(data);
    };
    fetchStocks();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        {user && <Navbar user={user} setUser={setUser} />}
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} stocks={stocks} model={model} /> : <Login setUser={setUser} />} />
          <Route path="/portfolio" element={user ? <Portfolio user={user} portfolio={portfolio} balance={balance} model={model} /> : <Login setUser={setUser} />} />
          <Route path="/buy-sell" element={user ? <BuySell user={user} portfolio={portfolio} setPortfolio={setPortfolio} balance={balance} setBalance={setBalance} /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
