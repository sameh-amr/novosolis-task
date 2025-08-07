import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, message, Spin } from 'antd';

import {
  fetchSensors,
  createSensor,
  deleteSensor,
  updateSensor,
} from './features/sensor-data/api/sensorapi';

import {
  setLoading,
  setError,
  setSensors,
  addSensor,
  removeSensor,
} from './features/sensor-data/store/sensoreslice';

import type { RootState, AppDispatch } from './store/index';
import type { Sensor } from './features/sensor-data/types/sensor';

import StatsCards from './features/sensor-data/components/statscard';
import FilterSort from './features/sensor-data/components/filtersort';
import AddSensorForm from './features/sensor-data/components/addsensorform';
import SensorTable from './features/sensor-data/components/sensortable';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.sensors);

  const [filterDeviceId, setFilterDeviceId] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        dispatch(setLoading(true));
        const sensors = await fetchSensors();
        dispatch(setSensors(sensors));
      } catch {
        dispatch(setError('Failed to fetch sensors'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    void loadData();
  }, [dispatch]);

  // Handlers
  const handleAdd = async (sensor: Omit<Sensor, 'id'>): Promise<void> => {
    try {
      const newSensor = await createSensor(sensor);
      dispatch(addSensor(newSensor));
      void message.success('Sensor added');
    } catch {
      void message.error('Add failed');
    }
  };

  const handleUpdate = async (id: number, changes: Partial<Sensor>): Promise<void> => {
    try {
      const existing = data.find((s) => s.id === id);
      if (!existing) return;
      const updatedSensor = { ...existing, ...changes };
      await updateSensor(id, updatedSensor);
      const refreshed = await fetchSensors(); // Optional: optimize with a reducer update
      dispatch(setSensors(refreshed));
      void message.success('Sensor updated');
    } catch {
      void message.error('Update failed');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteSensor(id);
      dispatch(removeSensor(id));
      void message.success('Sensor deleted');
    } catch {
      void message.error('Delete failed');
    }
  };

  const filteredData = useMemo(() => {
    let result = [...data];
    if (filterDeviceId) {
      result = result.filter((d) =>
        d.device_id.toLowerCase().includes(filterDeviceId.toLowerCase()),
      );
    }
    return result.sort((a, b) => {
      const tA = new Date(a.timestamp).getTime();
      const tB = new Date(b.timestamp).getTime();
      return sortOrder === 'asc' ? tA - tB : tB - tA;
    });
  }, [data, filterDeviceId, sortOrder]);

  const uniqueDeviceIds = useMemo(() => {
    return Array.from(new Set(data.map((d) => d.device_id)));
  }, [data]);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading sensors..." />
        </div>
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon className="mb-4" />
      ) : (
        <>
          <StatsCards data={filteredData} />
          <FilterSort
            filterDeviceId={filterDeviceId}
            setFilterDeviceId={setFilterDeviceId}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            uniqueDeviceIds={uniqueDeviceIds}
          />
          <AddSensorForm onAdd={(sensor) => void handleAdd(sensor)} />
          <SensorTable
            data={filteredData}
            onUpdate={(id, changes) => void handleUpdate(id, changes)}
            onDelete={(id) => void handleDelete(id)}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
