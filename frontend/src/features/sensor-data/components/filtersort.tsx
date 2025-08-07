import React from 'react';
import { Select, Radio } from 'antd';

interface FilterSortProps {
  filterDeviceId: string;
  setFilterDeviceId: (val: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (val: 'asc' | 'desc') => void;
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
    <div className="flex items-center justify-between mb-4">
      <Select
        allowClear
        placeholder="Filter by Device ID"
        value={filterDeviceId || undefined}
        onChange={setFilterDeviceId}
        style={{ width: 240 }}
      >
        {uniqueDeviceIds.map((id) => (
          <Select.Option key={id} value={id}>
            {id}
          </Select.Option>
        ))}
      </Select>

      <Radio.Group
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
      >
        <Radio.Button value="asc">Oldest First</Radio.Button>
        <Radio.Button value="desc">Newest First</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default FilterSort;
