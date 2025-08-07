import { fetchSensors } from '../api/sensorapi';
import apiClient from '../../../shared/api/client';

// Mock the API client
jest.mock('../../../shared/api/client');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('Sensor Data API - GET Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSensorData = [
    {
      id: 1,
      device_id: 'abc123',
      timestamp: '2024-05-01T12:00:00Z',
      temperature: 23.5,
      humidity: 60,
    },
    {
      id: 2,
      device_id: 'xyz789',
      timestamp: '2024-05-01T12:01:00Z',
      temperature: 22.0,
      humidity: 58,
    },
  ];

  it('should fetch sensor data from correct endpoint', async () => {
    // Arrange
    mockedApiClient.get.mockResolvedValueOnce({ data: mockSensorData });

    // Act
    const result = await fetchSensors();

    // Assert
    expect(mockedApiClient.get).toHaveBeenCalledWith('/sensor-data');
    expect(mockedApiClient.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSensorData);
  });

  it('should return correct data structure', async () => {
    // Arrange
    mockedApiClient.get.mockResolvedValueOnce({ data: mockSensorData });

    // Act
    const result = await fetchSensors();

    // Assert
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    
    // Check first sensor object structure
    const firstSensor = result[0];
    expect(firstSensor).toHaveProperty('id');
    expect(firstSensor).toHaveProperty('device_id');
    expect(firstSensor).toHaveProperty('timestamp');
    expect(firstSensor).toHaveProperty('temperature');
    expect(firstSensor).toHaveProperty('humidity');
    
    // Check data types
    expect(typeof firstSensor.id).toBe('number');
    expect(typeof firstSensor.device_id).toBe('string');
    expect(typeof firstSensor.timestamp).toBe('string');
    expect(typeof firstSensor.temperature).toBe('number');
    expect(typeof firstSensor.humidity).toBe('number');
  });

  it('should handle empty response', async () => {
    // Arrange
    mockedApiClient.get.mockResolvedValueOnce({ data: [] });

    // Act
    const result = await fetchSensors();

    // Assert
    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it('should handle network errors', async () => {
    // Arrange
    const errorMessage = 'Network Error';
    mockedApiClient.get.mockRejectedValueOnce(new Error(errorMessage));

    // Act & Assert
    await expect(fetchSensors()).rejects.toThrow(errorMessage);
  });

  it('should handle API errors with status codes', async () => {
    // Arrange
    const apiError = {
      response: {
        status: 500,
        data: { message: 'Internal Server Error' }
      }
    };
    mockedApiClient.get.mockRejectedValueOnce(apiError);

    // Act & Assert
    await expect(fetchSensors()).rejects.toEqual(apiError);
  });

  it('should validate sensor data properties', async () => {
    // Arrange
    mockedApiClient.get.mockResolvedValueOnce({ data: mockSensorData });

    // Act
    const result = await fetchSensors();

    // Assert
    result.forEach(sensor => {
      // Required fields validation
      expect(sensor.id).toBeDefined();
      expect(sensor.device_id).toBeDefined();
      expect(sensor.timestamp).toBeDefined();
      expect(sensor.temperature).toBeDefined();
      expect(sensor.humidity).toBeDefined();

      // Value validation
      expect(sensor.id).toBeGreaterThan(0);
      expect(sensor.device_id.length).toBeGreaterThan(0);
      expect(new Date(sensor.timestamp).getTime()).not.toBeNaN();
      expect(typeof sensor.temperature).toBe('number');
      expect(typeof sensor.humidity).toBe('number');
      expect(sensor.humidity).toBeGreaterThanOrEqual(0);
      expect(sensor.humidity).toBeLessThanOrEqual(100);
    });
  });
});
