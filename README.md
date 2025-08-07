# NOVOSOLIS Sensor Data Management System

A full-stack application for managing sensor data with real-time monitoring and CRUD operations.

## 🏗️ Architecture

This project follows a **vertical slice architecture** with clean separation of concerns:

```
novosolis-task/
├── backend/          # NestJS API Server
├── frontend/         # React TypeScript UI
└── docker-compose.yml # Container orchestration
```

## 🛠️ Technologies Used

### Backend
- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Language**: TypeScript
- **Architecture**: Clean Architecture with vertical slicing
- **Data Storage**: JSON file-based storage
- **API**: RESTful endpoints
- **Testing**: Jest for unit and e2e testing
- **Linting**: ESLint with TypeScript rules

### Frontend
- **Framework**: [React 18](https://reactjs.org/) with TypeScript
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Library**: [Ant Design](https://ant.design/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for frontend)
- **Development**: Hot reload for both frontend and backend

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** (v20 or higher)
- **Docker Compose** (v2 or higher)

## 🚀 Quick Start with Docker

### 1. Clone the Repository
```bash
git clone https://github.com/sameh-amr/novosolis-task.git
cd novosolis-task
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
    

## 🔧 Development Setup

### Backend Development

#### 1. Navigate to Backend Directory
```bash
cd backend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run start:dev
```

#### 4. Run Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

#### 5. Linting & Formatting
```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Frontend Development

#### 1. Navigate to Frontend Directory
```bash
cd frontend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm start
```

#### 4. Run Tests
```bash
# Run all tests
npm test

# Run specific test
npm test sensorApi

# Run tests with coverage
npm test -- --coverage
```

#### 5. Build for Production
```bash
npm run build
```

#### 6. Linting & Formatting
```bash
# Type checking
npm run typecheck

# ESLint check
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all validations
npm run validate
```

## 📡 API Endpoints

### Sensor Data Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sensor-data` | Fetch all sensor data |
| POST | `/api/sensor-data` | Create new sensor data |
| PUT | `/api/sensor-data/:id` | Update sensor data by ID |
| DELETE | `/api/sensor-data/:id` | Delete sensor data by ID |

### Sample API Request

```bash
# GET all sensors
curl http://localhost:5000/api/sensor-data

# POST new sensor
curl -X POST http://localhost:5000/api/sensor-data \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "abc123",
    "temperature": 23.5,
    "humidity": 60
  }'
```

## 🗂️ Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── application/          # Use cases (business logic)
│   │   └── use-cases/
│   ├── domain/              # Entities and repositories
│   │   ├── entities/
│   │   └── repositories/
│   ├── infrastructure/      # External concerns
│   │   └── repositories/
│   └── interfaces/          # Controllers and DTOs
│       ├── controllers/
│       └── dtos/
├── data/                    # JSON data storage
├── test/                    # E2E tests
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── features/
│   │   └── sensor-data/
│   │       ├── api/         # API calls
│   │       ├── components/  # React components
│   │       ├── hooks/       # Custom hooks
│   │       ├── store/       # Redux slice
│   │       ├── types/       # TypeScript types
│   │       └── __tests__/   # Tests
│   ├── shared/
│   │   └── api/            # Shared API client
│   ├── store/              # Redux store
│   └── common/             # Shared components
└── package.json
```

## 🎨 Features

### Dashboard Features
- **📊 Real-time Statistics**: Average temperature, humidity, active devices
- **🔍 Data Filtering**: Filter by device ID
- **📈 Data Sorting**: Sort by timestamp (newest/oldest first)
- **➕ Add Sensor Data**: Modal form for creating new entries
- **✏️ Edit Data**: Inline editing with validation
- **🗑️ Delete Data**: Confirmation-based deletion
- **📱 Responsive Design**: Mobile-friendly interface

### Technical Features
- **🔒 Type Safety**: Full TypeScript implementation
- **🧪 Comprehensive Testing**: Unit and integration tests
- **🎯 Clean Architecture**: Vertical slice design
- **🚀 Performance**: Optimized React rendering
- **📦 Containerized**: Docker-ready deployment
- **🔄 State Management**: Redux Toolkit integration

## 🧪 Testing Strategy

### Backend Tests
- **Unit Tests**: Service layer and use cases
- **E2E Tests**: Full API endpoint testing
- **Integration Tests**: Repository and database layer

### Frontend Tests
- **Component Tests**: React component rendering
- **API Tests**: HTTP client functionality
- **Redux Tests**: State management logic
- **Integration Tests**: User workflow testing

## 🐳 Docker Configuration

### Services
- **Backend**: NestJS app running on port 5000
- **Frontend**: React app served by Nginx on port 3000

### Environment Variables
```bash
# Backend
NODE_ENV=production
PORT=3000

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

#### 2. Docker Build Issues
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### 3. Permission Issues (Linux/Mac)
```bash
sudo chown -R $USER:$USER .
```

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload in development mode
2. **API Testing**: Use tools like Postman or curl for API testing
3. **Debugging**: Use browser DevTools for frontend, VS Code debugger for backend
4. **Database**: Sensor data is stored in `backend/data/sensor-data.json`

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://reactjs.org/docs/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Ant Design Components](https://ant.design/components/overview/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 License

This project is for demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

---

**Happy coding! 🚀**
