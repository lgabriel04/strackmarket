const apiKey = '15J4TACBM8N6WVPY'; // Replace with your Alpha Vantage API key

function formatMarketCap(marketCap) {
  const suffixes = ['', 'thousand', 'million', 'billion', 'trillion'];
  let suffixIndex = 0;
  while (marketCap >= 1000 && suffixIndex < suffixes.length - 1) {
    marketCap /= 1000;
    suffixIndex++;
  }
  return `${marketCap.toFixed(2)} ${suffixes[suffixIndex]} dollars`;
}

async function fetchStockPriceData(symbol) {
  const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`);
  const data = await response.json();
  const timeSeriesData = data['Time Series (Daily)'];
  const dates = Object.keys(timeSeriesData).reverse();
  const prices = dates.map(date => parseFloat(timeSeriesData[date]['4. close']));
  return { dates, prices };
}

async function fetchStockInfo(symbol) {
  const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
  const data = await response.json();
  return {
    open: data.Open,
    high: data.High,
    low: data.Low,
    marketCap: data.MarketCapitalization ? formatMarketCap(parseFloat(data.MarketCapitalization)) : null,
    peRatio: data.PERatio,
    dividendYield: data.DividendYield,
    currentPrice: data.Price,
  };
}

export { fetchStockPriceData, fetchStockInfo };
