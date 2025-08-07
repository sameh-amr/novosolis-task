import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, message } from 'antd';
import { Plus } from 'lucide-react';
import type { Sensor } from '../types/sensor';

interface AddSensorFormProps {
  onAdd: (data: Sensor) => void;
}

const AddSensorForm: React.FC<AddSensorFormProps> = ({ onAdd }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: Sensor): void => {
    setLoading(true);
    try {
      onAdd(values);
      form.resetFields();
      void message.success('Sensor data added successfully!');
    } catch (error) {
      void message.error('Failed to add sensor data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-teal-600" />
          <span className="text-lg font-semibold">Add New Sensor Data</span>
        </div>
      }
      className="mb-6"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values: Sensor) => {
          handleSubmit(values);
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Form.Item
          label="Device ID"
          name="device_id"
          rules={[{ required: true, message: 'Please enter device ID' }]}
        >
          <Input placeholder="e.g., abc123" size="large" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Temperature (°C)"
          name="temperature"
          rules={[
            { required: true, message: 'Please enter temperature' },
            {
              type: 'number',
              min: -50,
              max: 100,
              message: 'Temperature must be between -50 and 100°C',
            },
          ]}
        >
          <InputNumber
            placeholder="23.5"
            size="large"
            className="w-full rounded-lg"
            precision={1}
          />
        </Form.Item>

        <Form.Item
          label="Humidity (%)"
          name="humidity"
          rules={[
            { required: true, message: 'Please enter humidity' },
            { type: 'number', min: 0, max: 100, message: 'Humidity must be between 0 and 100%' },
          ]}
        >
          <InputNumber placeholder="60" size="large" className="w-full rounded-lg" precision={0} />
        </Form.Item>

        <Form.Item label=" " className="flex items-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 border-0 rounded-lg hover:from-blue-700 hover:to-teal-700"
            icon={<Plus className="h-4 w-4" />}
          >
            Add Data
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddSensorForm;
