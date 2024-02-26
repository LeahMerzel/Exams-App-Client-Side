// useFilterableTable.js
import { useState } from "react";

function useFilterableTable(initialData) {
  const [filterText, setFilterText] = useState('');

  const filterFunction = (item, filterText) => {
    return Object.values(item).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filterText.toLowerCase());
      }
      return false;
    });
  };

  const filteredData = initialData.filter((item) =>
    filterFunction(item, filterText) || filterText.trim() === ''
  );

  return {
    filterText,
    setFilterText,
    filteredData,
  };
}

export default useFilterableTable;

