import React, { useState } from 'react';
import { Table, Card, Button, Popconfirm, Tag, Space } from 'antd';
import { Edit2, Trash2, Thermometer, Droplets } from 'lucide-react';
import type { Sensor } from '../types/sensor';
import EditModal from './editmodal';
import type { ColumnsType } from 'antd/es/table';

interface SensorTableProps {
  data: Sensor[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Sensor>) => void;
}

const SensorTable: React.FC<SensorTableProps> = ({ data, onDelete, onUpdate }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);

  const handleEdit = (sensor: Sensor) => {
    setEditingSensor(sensor);
    setEditModalVisible(true);
  };

  const handleUpdate = (id: number, updatedData: Partial<Sensor>) => {
    onUpdate(id, updatedData);
    setEditModalVisible(false);
    setEditingSensor(null);
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 20) return 'blue';
    if (temp < 25) return 'green';
    if (temp < 30) return 'orange';
    return 'red';
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity < 40) return 'orange';
    if (humidity < 70) return 'green';
    return 'blue';
  };

  const columns: ColumnsType<Sensor> = [
    {
      title: 'Device ID',
      dataIndex: 'device_id',
      key: 'device_id',
      render: (deviceId: string) => (
        <Tag color="blue" className="font-mono">
          {deviceId}
        </Tag>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => (
        <div className="text-sm">
          <div className="font-medium">{new Date(timestamp).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(timestamp).toLocaleTimeString()}</div>
        </div>
      ),
      responsive: ['sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      key: 'temperature',
      render: (temp: number) => (
        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4 text-orange-500" />
          <Tag color={getTemperatureColor(temp)} className="font-medium">
            {temp}°C
          </Tag>
        </div>
      ),
      sorter: (a, b) => a.temperature - b.temperature,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Humidity',
      dataIndex: 'humidity',
      key: 'humidity',
      render: (humidity: number) => (
        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4 text-blue-500" />
          <Tag color={getHumidityColor(humidity)} className="font-medium">
            {humidity}%
          </Tag>
        </div>
      ),
      sorter: (a, b) => a.humidity - b.humidity,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Sensor) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            icon={<Edit2 className="h-4 w-4" />}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete sensor data"
            description="Are you sure you want to delete this record?"
            onConfirm={() => onDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" size="small" danger icon={<Trash2 className="h-4 w-4" />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  ];

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Sensor Data Records</span>
            <div className="text-sm text-gray-500">
              {data.length} record{data.length !== 1 ? 's' : ''}
            </div>
          </div>
        }
        className="overflow-hidden"
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
          className="sensor-table"
        />
      </Card>

      <EditModal
        visible={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingSensor(null);
        }}
        onSave={handleUpdate}
        sensor={editingSensor}
      />
    </>
  );
};

export default SensorTable;
