import React, { useState } from 'react';

function SearchBar(props) {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(symbol);
  };

  const handleInputChange = (event) => {
    setSymbol(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter stock symbol" value={symbol} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
