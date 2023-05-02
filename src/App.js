import React, { useState,  } from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';
import ChartComponent from './Chart';
import { fetchStockPriceData, fetchStockInfo } from './api';
import './App.css';
import { Helmet } from 'react-helmet';
import Modal from './Modal';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [symbol, setSymbol] = useState('');  
  const [stockData, setStockData] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '15J4TACBM8N6WVPY'; // The Alpha Vantage API key//////////////////////////////// 

  const handleSubmit = async (searchTerm) => {
    try {
      const data = await fetchStockPriceData(searchTerm, apiKey);
      const info = await fetchStockInfo(searchTerm, apiKey);
      setSymbol(searchTerm);
      setStockData(data);
      setStockInfo(info);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Couldn't find stock price. Please only input the registered ticker symbol of that company. For example, TESLA: TSLA");
    }
  };

  return (
    <div>
      <>

      <Nav />
      <h1 className='title'>StrackMarket</h1>
      <SearchForm onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
      {stockData && (
        <>
          <ChartComponent symbol={symbol} dates={stockData.dates} prices={stockData.prices} />
          {stockInfo && (
            <div className='prices'>
              <p>Open: {stockInfo.open}</p>
              <p>High: {stockInfo.high}</p>
              <p>Low: {stockInfo.low}</p>
              <p>Mkt cap: {stockInfo.marketCap}</p>
              <p>P/E ratio: {stockInfo.peRatio}</p>
              <p>Div yield: {stockInfo.dividendYield}</p>
              <p>Current price: {stockInfo.currentPrice}</p>
            </div>
          )}
        </>
      )}
      </>
    </div>
  );
}

export default App;
