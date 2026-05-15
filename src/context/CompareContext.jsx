import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    const savedList = localStorage.getItem('compareList');
    if (savedList) {
      try {
        setCompareList(JSON.parse(savedList));
      } catch (e) {
        console.error('Failed to parse compare list');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
    if (compareList.length > 0 && !isMinimized) {
      setIsPanelVisible(true);
    } else if (compareList.length === 0) {
      setIsPanelVisible(false);
      setIsMinimized(false);
    }
  }, [compareList]);

  const addToCompare = (product) => {
    if (compareList.find(p => p._id === product._id)) {
      removeFromCompare(product._id);
      return;
    }
    if (compareList.length >= 3) {
      alert('You can compare up to 3 products at a time.');
      return;
    }
    setCompareList([...compareList, product]);
    setIsMinimized(false);
    setIsPanelVisible(true);
  };

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter(p => p._id !== productId));
  };

  const clearCompareList = () => {
    setCompareList([]);
    setIsPanelVisible(false);
    setIsMinimized(false);
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
    if (!isPanelVisible) setIsMinimized(false);
  };

  const minimizePanel = () => {
    setIsPanelVisible(false);
    setIsMinimized(true);
  };

  const expandPanel = () => {
    setIsPanelVisible(true);
    setIsMinimized(false);
  };

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompareList,
      isPanelVisible,
      isMinimized,
      minimizePanel,
      expandPanel,
      togglePanel
    }}>
      {children}
    </CompareContext.Provider>
  );
};
