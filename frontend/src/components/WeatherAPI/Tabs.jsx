import React from 'react';
import './Tabs.css';

const Tabs = ({ cities, selectedCity, onSelectCity }) => (
  <div className="tabs">
    {cities.map(city => (
      <button
        key={city}
        className={`tab-button ${city === selectedCity ? 'active' : ''}`}
        onClick={() => onSelectCity(city)}
      >
        {city}
      </button>
    ))}
  </div>
);

export default Tabs;