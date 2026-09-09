import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { INITIAL_VEHICLES } from '../api/mockData';

interface SavedCarsContextType {
  savedIds: string[];
  compareIds: string[];
  toggleSave: (vehicleId: string) => void;
  isSaved: (vehicleId: string) => boolean;
  toggleCompare: (vehicleId: string) => void;
  isCompared: (vehicleId: string) => boolean;
  clearCompare: () => void;
  savedVehicles: Vehicle[];
  compareVehicles: Vehicle[];
}

const SavedCarsContext = createContext<SavedCarsContextType | undefined>(undefined);

export const SavedCarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agorazo_saved_cars');
      return saved ? JSON.parse(saved) : ['byd-seal-2025'];
    } catch {
      return ['byd-seal-2025'];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agorazo_compare_cars');
      return saved ? JSON.parse(saved) : ['byd-song-plus-2026', 'byd-seal-2025'];
    } catch {
      return ['byd-song-plus-2026', 'byd-seal-2025'];
    }
  });

  useEffect(() => {
    localStorage.setItem('agorazo_saved_cars', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('agorazo_compare_cars', JSON.stringify(compareIds));
  }, [compareIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 vehicles at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const isCompared = (id: string) => compareIds.includes(id);

  const clearCompare = () => setCompareIds([]);

  const savedVehicles = INITIAL_VEHICLES.filter((v) => savedIds.includes(v.id));
  const compareVehicles = INITIAL_VEHICLES.filter((v) => compareIds.includes(v.id));

  return (
    <SavedCarsContext.Provider
      value={{
        savedIds,
        compareIds,
        toggleSave,
        isSaved,
        toggleCompare,
        isCompared,
        clearCompare,
        savedVehicles,
        compareVehicles,
      }}
    >
      {children}
    </SavedCarsContext.Provider>
  );
};

export const useSavedCars = () => {
  const context = useContext(SavedCarsContext);
  if (!context) {
    throw new Error('useSavedCars must be used within a SavedCarsProvider');
  }
  return context;
};
