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
      // 이미 선택된 suggestion을 다시 클릭한 경우
    if (selectedSuggestion && selectedSuggestion.id === id) {
        setSelectedSuggestion(null); // content 숨기기
        return;
    }

    try {
        const response = await customAxios.get(`/api/suggestions/${id}`);
        setSelectedSuggestion(response.data);
    } catch (error) {
        console.error("Error fetching suggestion details:", error);
    }
    };
  
    return (
        <div className={styles.suggestionContainer}>
          <div className={styles.suggestionList}>
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.id)}>
               제목: {suggestion.title} || 생성된 날짜:{suggestion.createdDate}
              </div>
            ))}
          </div>
  
          <div className={styles.suggestionDetails}>
            {selectedSuggestion && (
              <div>
                {selectedSuggestion.content}
              </div>
            )}
          </div>
        </div>
      );
  }
  
  export default SuggestionM;