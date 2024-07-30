import React, { useState, useEffect, useCallback } from 'react';
import { TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import styles from './LocationSearch.module.css';

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: query,
            format: 'json',
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const newTimeout = setTimeout(() => {
      fetchSuggestions(query);
    }, 500);
    setTypingTimeout(newTimeout);
  }, [query, fetchSuggestions]);

  const handleSelect = (location: any) => {
    onChange(`${location.lat},${location.lon}`);
    setQuery(location.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.locationSearch}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
        label="Search Location"
        variant="outlined"
        inputProps={{ style: { color: '#ffffff' }, onFocus: () => setShowSuggestions(true) }}
      />
      {loading && <CircularProgress size={24} className={styles.loadingSpinner} />}
      {showSuggestions && suggestions.length > 0 && (
        <List className={styles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <ListItem button key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
              <ListItemText primary={suggestion.display_name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default LocationSearch;
