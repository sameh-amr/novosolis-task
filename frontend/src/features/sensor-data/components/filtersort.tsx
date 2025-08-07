import React from 'react';
import { Select, Button } from 'antd';
import { ArrowUpDown } from 'lucide-react';

interface FilterSortProps {
  filterDeviceId: string;
  setFilterDeviceId: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  uniqueDeviceIds: string[];
}

const FilterSort: React.FC<FilterSortProps> = ({
  filterDeviceId,
  setFilterDeviceId,
  sortOrder,
  setSortOrder,
  uniqueDeviceIds,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex-1">
        <label htmlFor="device-select" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Device ID
        </label>
        <Select
          id="device-select"
          placeholder="All devices"
          value={filterDeviceId || undefined}
          onChange={setFilterDeviceId}
          allowClear
          className="w-full"
          size="large"
        >
          {uniqueDeviceIds.map((deviceId) => (
            <Select.Option key={deviceId} value={deviceId}>
              {deviceId}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex-shrink-0">
        <label htmlFor="sort-button" className="block text-sm font-medium text-gray-700 mb-2">
          Sort by Timestamp
        </label>
        <Button
          id="sort-button"
          type="default"
          size="large"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center space-x-2"
          icon={<ArrowUpDown className="h-4 w-4" />}
        >
          {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
        </Button>
      </div>
    </div>
  );
};

export default FilterSort;
