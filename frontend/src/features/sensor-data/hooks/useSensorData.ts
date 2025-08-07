import { useState, useMemo } from 'react';
import type { Sensor } from '../types/sensor';

const initialData: Sensor[] = [
  {
    id: 1,
    device_id: 'abc123',
    timestamp: '2024-05-01T12:00:00Z',
    temperature: 23.5,
    humidity: 60,
  },
  {
    id: 2,
    device_id: 'abc123',
    timestamp: '2024-05-01T12:01:00Z',
    temperature: 22.0,
    humidity: 58,
  },
  {
    id: 3,
    device_id: 'abc123',
    timestamp: '2024-05-01T12:02:00Z',
    temperature: 24.0,
    humidity: 62,
  },
  {
    id: 4,
    device_id: 'xyz789',
    timestamp: '2024-05-01T12:03:00Z',
    temperature: 21.0,
    humidity: 59,
  },
];

export const useSensorData = () => {
  const [data, setData] = useState<Sensor[]>(initialData);
  const [filterDeviceId, setFilterDeviceId] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    if (filterDeviceId) {
      filtered = data.filter((item) =>
        item.device_id.toLowerCase().includes(filterDeviceId.toLowerCase()),
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [data, filterDeviceId, sortOrder]);

  const addSensorData = (newData: Omit<Sensor, 'id' | 'timestamp'>) => {
    const newEntry: Sensor = {
      id: Math.max(...data.map((d) => d.id), 0) + 1,
      timestamp: new Date().toISOString(),
      ...newData,
    };
    setData((prev) => [...prev, newEntry]);
  };

  const updateSensorData = (id: number, updatedData: Partial<Sensor>) => {
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
  };

  const deleteSensorData = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const uniqueDeviceIds = useMemo(() => Array.from(new Set(data.map((d) => d.device_id))), [data]);

  return {
    data: filteredAndSortedData,
    originalData: data,
    filterDeviceId,
    setFilterDeviceId,
    sortOrder,
    setSortOrder,
    addSensorData,
    updateSensorData,
    deleteSensorData,
    uniqueDeviceIds,
  };
};
