import React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchInputProps {
  placeholder: string;
  onChangeSearch: () => string;
  searchQuery: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChangeSearch, searchQuery }) => (
  <Searchbar placeholder={placeholder} onChangeText={onChangeSearch} value={searchQuery} />
);

export default SearchInput;
