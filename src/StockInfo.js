import React, { useRef, useEffect, useState } from 'react';
import Chart from './Chart';
import { fetchStockInfo } from './api';

function StockInfo(props) {
  return (
    <div>
      {props.open && <p>Open: {props.open}</p>}
      {props.high && <p>High: {props.high}</p>}
      {props.low && <p>Low: {props.low}</p>}
      {props.marketCap && <p>Mkt cap: {props.marketCap}</p>}
      {props.peRatio && <p>P/E ratio: {props.peRatio}</p>}
      {props.dividendYield && <p>Div yield: {props.dividendYield}</p>}
      {props.currentPrice && <p>Current price: {props.currentPrice}</p>}
    </div>
  );
}

function ChartComponent(props) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [stockInfo, setStockInfo] = useState(null);
  const apiKey = '15J4TACBM8N6WVPY'; // Replace with your Alpha Vantage API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockInfo(props.symbol, apiKey);
        setStockInfo(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [props.symbol]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: props.dates,
        datasets: [
          {
            label: props.symbol,
            data: props.prices,
            fill: false,
            borderColor: '#6CE094',
            pointRadius: 0,
          },
        ],
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [props.symbol, props.dates, props.prices]);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <canvas ref={canvasRef} />
      {stockInfo && (
        <StockInfo
          open={stockInfo.open}
          high={stockInfo.high}
          low={stockInfo.low}
          marketCap={stockInfo.marketCap}
          peRatio={stockInfo.peRatio}
          dividendYield={stockInfo.dividendYield}
          currentPrice={stockInfo.currentPrice}
        />
      )}
    </div>
  );
}

export default ChartComponent;
