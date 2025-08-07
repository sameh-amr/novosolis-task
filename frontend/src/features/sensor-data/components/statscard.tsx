import React from 'react';
import { Card } from 'antd';
import { Thermometer, Droplets, Smartphone, Clock } from 'lucide-react';
import type { Sensor } from '../types/sensor';

interface StatsCardsProps {
  data: Sensor[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const avgTemperature =
    data.length > 0
      ? (data.reduce((sum, d) => sum + d.temperature, 0) / data.length).toFixed(1)
      : '0';

  const avgHumidity =
    data.length > 0 ? (data.reduce((sum, d) => sum + d.humidity, 0) / data.length).toFixed(1) : '0';

  const uniqueDevices = new Set(data.map((d) => d.device_id)).size;
  const lastUpdate =
    data.length > 0
      ? new Date(Math.max(...data.map((d) => new Date(d.timestamp).getTime()))).toLocaleTimeString()
      : 'N/A';

  const stats = [
    {
      title: 'Avg Temperature',
      value: `${avgTemperature}°C`,
      icon: <Thermometer className="h-6 w-6 text-orange-500" />,
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Avg Humidity',
      value: `${avgHumidity}%`,
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Devices',
      value: uniqueDevices.toString(),
      icon: <Smartphone className="h-6 w-6 text-green-500" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'Last Update',
      value: lastUpdate,
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
