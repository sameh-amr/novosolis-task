import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import type { Sensor } from '../types/sensor';

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (id: number, data: Partial<Sensor>) => void;
  sensor: Sensor | null;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onCancel, onSave, sensor }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (sensor && visible) {
      void form.setFieldsValue({
        device_id: sensor.device_id,
        temperature: sensor.temperature,
        humidity: sensor.humidity,
      });
    }
  }, [sensor, visible, form]);

  const handleSave = async (): Promise<void> => {
    try {
      const rawValues = (await form.validateFields()) as {
        device_id: string;
        temperature: number;
        humidity: number;
      };

      const values: Partial<Sensor> = {
        device_id: rawValues.device_id,
        temperature: rawValues.temperature,
        humidity: rawValues.humidity,
      };

      if (sensor) {
        onSave(sensor.id, values);
        void message.success('Sensor data updated successfully!');
        onCancel();
      }
    } catch (error) {
      void message.error('Please check the form fields');
    }
  };

  return (
    <Modal
      title="Edit Sensor Data"
      open={visible}
      onCancel={onCancel}
      onOk={() => void handleSave()} // ✅ Fixes no-misused-promises
      okText="Save Changes"
      cancelText="Cancel"
      okButtonProps={{
        className: 'bg-gradient-to-r from-blue-600 to-teal-600 border-0',
      }}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          label="Device ID"
          name="device_id"
          rules={[{ required: true, message: 'Please enter device ID' }]}
        >
          <Input placeholder="e.g., abc123" size="large" />
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
          <InputNumber placeholder="23.5" size="large" className="w-full" precision={1} />
        </Form.Item>

        <Form.Item
          label="Humidity (%)"
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
          <InputNumber placeholder="60" size="large" className="w-full" precision={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
