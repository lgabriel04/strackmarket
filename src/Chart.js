import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function ChartComponent(props) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

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
    </div>
  );
}

export default ChartComponent;
