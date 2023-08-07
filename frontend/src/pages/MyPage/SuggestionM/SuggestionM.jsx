import React, { useState, useEffect } from 'react';
import styles from './SuggestionM.module.css'
import customAxios from '../../../util/customAxios';

const SuggestionM = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  
    useEffect(() => {
      // 초기 데이터 로딩
      async function fetchData() {
        try {
          const response = await customAxios.get('/api/suggestions');
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }
  
      fetchData();
    }, []);
  
    const handleSuggestionClick = async (id) => {
      try {
        const response = await customAxios.get(`/api/suggestions/${id}`);
        setSelectedSuggestion(response.data);
      } catch (error) {
        console.error("Error fetching suggestion details:", error);
      }
    };
  
    return (
      <div className="suggestion-container">
        <div className="suggestion-list">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.id)}>
              {suggestion.title}
            </div>
          ))}
        </div>
  
        {selectedSuggestion && (
          <div className="suggestion-details">
            {selectedSuggestion.content}
          </div>
        )}
      </div>
    );
  }
  
  export default SuggestionM;