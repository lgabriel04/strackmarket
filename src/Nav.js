import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faChartLine} />
        <span>StrackMarket</span>
      </div>
      {/* add any additional navbar items here */}
    </nav>
  );
}

export default Nav;
