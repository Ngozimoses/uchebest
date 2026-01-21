// src/hooks/useScanPoints.js
import { useState, useEffect } from 'react';
import { savePoints, loadPoints, saveLastScanDate, loadLastScanDate } from '../utils/storage';

export default function useScanPoints() {
  const [points, setPoints] = useState(0);
  const [lastScanDate, setLastScanDate] = useState('');

  useEffect(() => {
    const savedPoints = loadPoints();
    const savedLastScan = loadLastScanDate();
    setPoints(savedPoints);
    setLastScanDate(savedLastScan);
  }, []);

  const canScanToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return lastScanDate !== today;
  };

  const awardPoints = (amount = 10) => {
    if (!canScanToday()) return false;

    const today = new Date().toISOString().split('T')[0];
    const newPoints = points + amount;

    setPoints(newPoints);
    setLastScanDate(today);

    savePoints(newPoints);
    saveLastScanDate(today);

    return true;
  };

  return {
    points,
    lastScanDate,
    canScanToday,
    awardPoints,
  };
}