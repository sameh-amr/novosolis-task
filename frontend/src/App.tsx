import React from 'react';
import { ConfigProvider } from 'antd';
import Header from '../src/common/Header';
import StatsCards from './features/sensor-data/components/statscard';
import FilterSort from './features/sensor-data/components/filtersort';
import AddSensorForm from './features/sensor-data/components/addsensorform';
import SensorTable from './features/sensor-data/components/sensortable';
import { useSensorData } from './features/sensor-data/hooks/useSensorData';

function App() {
  const {
    data,
    originalData,
    filterDeviceId,
    setFilterDeviceId,
    sortOrder,
    setSortOrder,
    addSensorData,
    updateSensorData,
    deleteSensorData,
    uniqueDeviceIds,
  } = useSensorData();

  const antdTheme = {
    token: {
      colorPrimary: '#1e40af',
      colorSuccess: '#059669',
      colorWarning: '#d97706',
      colorError: '#dc2626',
      borderRadius: 8,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <StatsCards data={originalData} />

          <FilterSort
            filterDeviceId={filterDeviceId}
            setFilterDeviceId={setFilterDeviceId}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            uniqueDeviceIds={uniqueDeviceIds}
          />

          <AddSensorForm onAdd={addSensorData} />

          <SensorTable data={data} onDelete={deleteSensorData} onUpdate={updateSensorData} />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
