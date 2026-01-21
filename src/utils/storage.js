// src/utils/storage.js

// Budget Storage
export const BUDGET_STORAGE_KEY = 'uchebest-budget';
export const POINTS_STORAGE_KEY = 'uchebest-points';
export const LAST_SCAN_DATE_KEY = 'uchebest-last-scan';

// Budget
export const saveBudgetToStorage = (budget) => {
  try {
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budget));
  } catch (e) {
    console.error('Failed to save budget:', e);
  }
};

export const loadBudgetFromStorage = () => {
  try {
    const data = localStorage.getItem(BUDGET_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load budget:', e);
    return [];
  }
};

// Points
export const savePoints = (points) => {
  try {
    localStorage.setItem(POINTS_STORAGE_KEY, points.toString());
  } catch (e) {
    console.error('Failed to save points:', e);
  }
};

export const loadPoints = () => {
  try {
    const data = localStorage.getItem(POINTS_STORAGE_KEY);
    return data ? parseInt(data, 10) : 0;
  } catch (e) {
    console.error('Failed to load points:', e);
    return 0;
  }
};

// Last Scan Date
export const saveLastScanDate = (date) => {
  try {
    localStorage.setItem(LAST_SCAN_DATE_KEY, date);
  } catch (e) {
    console.error('Failed to save scan date:', e);
  }
};

export const loadLastScanDate = () => {
  try {
    return localStorage.getItem(LAST_SCAN_DATE_KEY) || '';
  } catch (e) {
    console.error('Failed to load scan date:', e);
    return '';
  }
};