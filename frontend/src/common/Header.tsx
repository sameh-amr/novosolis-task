import React from 'react';
import { Thermometer } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-600 text-white py-6 px-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <Thermometer className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">NOVOSOLIS</h1>
            <p className="text-blue-100 text-sm">Sensor Data Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
