import React from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { Plus } from 'lucide-react';
import type { Sensor } from '../types/sensor';

interface AddSensorFormProps {
  onAdd: (sensor: Omit<Sensor, 'id'>) => void;
  isModalVisible: boolean;
  showModal: () => void;
  handleCancel: () => void;
}

const AddSensorForm: React.FC<AddSensorFormProps> = ({
  onAdd,
  isModalVisible,
  showModal,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: Omit<Sensor, 'id'>) => {
    onAdd(values);
    form.resetFields();
    handleCancel();
  };

  return (
    <>
      <div className="mb-6">
        <Button
          type="primary"
          size="large"
          onClick={showModal}
          className="bg-gradient-to-r from-blue-600 to-teal-600 border-0 rounded-lg hover:from-blue-700 hover:to-teal-700 shadow-lg"
          icon={<Plus className="h-5 w-5" />}
        >
          Add New Sensor Data
        </Button>
      </div>

      <Modal
        title={
          <div className="flex items-center space-x-3 text-xl font-semibold text-gray-800">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span>Add New Sensor Data</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="top-8"
        destroyOnClose
      >
        <div className="mt-6">
          <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                label={<span className="text-sm font-medium text-gray-700">Device ID</span>}
                name="device_id"
                rules={[{ required: true, message: 'Please enter device ID' }]}
              >
                <Input
                  placeholder="e.g., abc123"
                  size="large"
                  className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-medium text-gray-700">Temperature (°C)</span>}
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
                  className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  precision={1}
                />
              </Form.Item>
            </div>

            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Humidity (%)</span>}
              name="humidity"
              rules={[
                { required: true, message: 'Please enter humidity' },
                {
                  type: 'number',
                  min: 0,
                  max: 100,
                  message: 'Humidity must be between 0 and 100%',
                },
              ]}
            >
              <InputNumber
                placeholder="60"
                size="large"
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                precision={0}
              />
            </Form.Item>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                size="large"
                onClick={handleCancel}
                className="rounded-lg border-gray-300 hover:border-gray-400"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="bg-gradient-to-r from-blue-600 to-teal-600 border-0 rounded-lg hover:from-blue-700 hover:to-teal-700 shadow-lg"
                icon={<Plus className="h-4 w-4" />}
              >
                Add Data
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddSensorForm;
