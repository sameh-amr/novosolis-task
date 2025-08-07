import React from 'react';
import { Card, Col, Row } from 'antd';
import type { Sensor } from '../types/sensor';

interface StatsCardsProps {
  data: Sensor[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const average = (arr: number[]): number =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const temperatures = data.map((d) => d.temperature);
  const humidities = data.map((d) => d.humidity);

  const avgTemp = average(temperatures).toFixed(1);
  const avgHumidity = average(humidities).toFixed(1);
  const activeDevices = new Set(data.map((d) => d.device_id)).size;
  const lastUpdate = data.length
    ? new Date(Math.max(...data.map((d) => new Date(d.timestamp).getTime()))).toLocaleString()
    : 'N/A';

  return (
    <Row gutter={16} className="mb-6">
      <Col span={6}>
        <Card title="Average Temperature">{avgTemp}°C</Card>
      </Col>
      <Col span={6}>
        <Card title="Average Humidity">{avgHumidity}%</Card>
      </Col>
      <Col span={6}>
        <Card title="Active Devices">{activeDevices}</Card>
      </Col>
      <Col span={6}>
        <Card title="Last Update">{lastUpdate}</Card>
      </Col>
    </Row>
  );
};

export default StatsCards;
