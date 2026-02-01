# Microservices Implementation Guide for Restaurant App

## 🎯 Overview
This guide will help you implement a microservices architecture for your restaurant application, providing scalability, resilience, and maintainability.

## 📋 Prerequisites
- Docker and Docker Compose installed
- Node.js 16+ for each service
- PostgreSQL or MongoDB for databases
- Redis for caching and message queuing
- Nginx for API Gateway

## 🏗️ Step 1: Service Architecture Design

### Service Breakdown
```
restaurant-app/
├── api-gateway/          # Nginx + Express Gateway
├── user-service/         # Authentication & Profiles (Port 8001)
├── menu-service/         # Menu Management (Port 8002)
├── order-service/        # Order Processing (Port 8003)
├── reservation-service/  # Table Reservations (Port 8004)
├── payment-service/      # Payment Processing (Port 8005)
├── notification-service/ # SMS/Email Notifications (Port 8006)
├── analytics-service/    # Data Analytics (Port 8007)
└── shared/              # Shared utilities and models
```

## 🚀 Step 2: API Gateway Setup

### Install API Gateway
```bash
mkdir api-gateway
cd api-gateway
npm init -y
npm install express express-gateway cors helmet morgan
```

### Gateway Configuration (`api-gateway/config/gateway.config.yml`)
```yaml
http:
  port: 8000
apiEndpoints:
  - name: users
    host: localhost
    paths: /api/users/*
  - name: menu
    host: localhost
    paths: /api/menu/*
  - name: orders
    host: localhost
    paths: /api/orders/*
  - name: reservations
    host: localhost
    paths: /api/reservations/*
  - name: payments
    host: localhost
    paths: /api/payments/*
  - name: notifications
    host: localhost
    paths: /api/notifications/*
  - name: analytics
    host: localhost
    paths: /api/analytics/*

serviceEndpoints:
  - name: user_service
    url: 'http://user-service:8001'
  - name: menu_service
    url: 'http://menu-service:8002'
  - name: order_service
    url: 'http://order-service:8003'
  - name: reservation_service
    url: 'http://reservation-service:8004'
  - name: payment_service
    url: 'http://payment-service:8005'
  - name: notification_service
    url: 'http://notification-service:8006'
  - name: analytics_service
    url: 'http://analytics-service:8007'

policies:
  - jwt
  - cors
  - rate-limit
  - proxy

pipelines:
  - name: user_pipeline
    apiEndpoints:
      - users
    policies:
      - cors:
          - origin: "*"
            methods: ["GET", "POST", "PUT", "DELETE"]
      - jwt:
      - proxy:
          - action:
              serviceEndpoint: user_service
              changeOrigin: true
```

## 🛠️ Step 3: Individual Service Implementation

### User Service Example
```bash
mkdir user-service
cd user-service
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors helmet
```

### User Service Structure
```
user-service/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── app.js
├── Dockerfile
└── package.json
```

### User Service Implementation (`user-service/src/app.js`)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-service');

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'user-service' });
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
```

## 🐳 Step 4: Docker Compose Setup

### Create `docker-compose.yml`
```yaml
version: '3.8'

services:
  # API Gateway
  api-gateway:
    build: ./api-gateway
    ports:
      - "8000:8000"
    depends_on:
      - user-service
      - menu-service
      - order-service
      - reservation-service
      - payment-service
      - notification-service
      - analytics-service
    networks:
      - restaurant-network

  # User Service
  user-service:
    build: ./user-service
    ports:
      - "8001:8001"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/user-service
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - mongodb
    networks:
      - restaurant-network

  # Menu Service
  menu-service:
    build: ./menu-service
    ports:
      - "8002:8002"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/menu-service
    depends_on:
      - mongodb
    networks:
      - restaurant-network

  # Order Service
  order-service:
    build: ./order-service
    ports:
      - "8003:8003"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/order-service
    depends_on:
      - mongodb
      - redis
    networks:
      - restaurant-network

  # Reservation Service
  reservation-service:
    build: ./reservation-service
    ports:
      - "8004:8004"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/reservation-service
    depends_on:
      - mongodb
    networks:
      - restaurant-network

  # Payment Service
  payment-service:
    build: ./payment-service
    ports:
      - "8005:8005"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/payment-service
    depends_on:
      - mongodb
    networks:
      - restaurant-network

  # Notification Service
  notification-service:
    build: ./notification-service
    ports:
      - "8006:8006"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    networks:
      - restaurant-network

  # Analytics Service
  analytics-service:
    build: ./analytics-service
    ports:
      - "8007:8007"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/analytics-service
    depends_on:
      - mongodb
    networks:
      - restaurant-network

  # Databases
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - restaurant-network

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    networks:
      - restaurant-network

  # Frontend
  frontend:
    build: ./restaurant-frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_GATEWAY=http://localhost:8000
    networks:
      - restaurant-network

volumes:
  mongodb_data:

networks:
  restaurant-network:
    driver: bridge
```

## 🔗 Step 5: Frontend Integration

### Update Frontend API Client
```javascript
// src/api/microservices.js
class MicroserviceClient {
    constructor() {
        this.gateway = process.env.REACT_APP_API_GATEWAY || 'http://localhost:8000';
        this.circuitBreakers = new Map();
    }

    async request(service, endpoint, options = {}) {
        const circuitBreaker = this.getCircuitBreaker(service);
        
        return circuitBreaker.call(async () => {
            const url = `${this.gateway}/api/${service}${endpoint}`;
            const token = localStorage.getItem('access_token');
            
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        });
    }

    getCircuitBreaker(service) {
        if (!this.circuitBreakers.has(service)) {
            this.circuitBreakers.set(service, new CircuitBreaker(service));
        }
        return this.circuitBreakers.get(service);
    }
}

// Circuit Breaker Implementation
class CircuitBreaker {
    constructor(service, threshold = 5, timeout = 60000) {
        this.service = service;
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.state = 'CLOSED';
        this.nextAttempt = Date.now();
    }

    async call(fn) {
        if (this.state === 'OPEN' && Date.now() < this.nextAttempt) {
            throw new Error(`Service ${this.service} is temporarily unavailable`);
        }

        try {
            const result = await fn();
            this.reset();
            return result;
        } catch (error) {
            this.recordFailure();
            throw error;
        }
    }

    recordFailure() {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }

    reset() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
}

export default new MicroserviceClient();
```

### Update Service Calls
```javascript
// src/api/services.js
import microserviceClient from './microservices';

export const authAPI = {
    login: (credentials) => microserviceClient.request('users/auth', '/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),
    register: (userData) => microserviceClient.request('users/auth', '/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),
    getUser: () => microserviceClient.request('users/users', '/profile'),
};

export const menuAPI = {
    getCategories: () => microserviceClient.request('menu', '/categories'),
    getMenuItems: (categoryId) => microserviceClient.request('menu', `/items${categoryId ? `?category=${categoryId}` : ''}`),
};

export const orderAPI = {
    createOrder: (orderData) => microserviceClient.request('orders', '/create', {
        method: 'POST',
        body: JSON.stringify(orderData)
    }),
    getOrderHistory: () => microserviceClient.request('orders', '/history'),
};
```

## 🧪 Step 6: Testing Microservices

### Service Health Checks
```javascript
// src/utils/healthCheck.js
class HealthChecker {
    constructor() {
        this.services = [
            { name: 'user-service', url: 'http://localhost:8001/health' },
            { name: 'menu-service', url: 'http://localhost:8002/health' },
            { name: 'order-service', url: 'http://localhost:8003/health' },
            { name: 'reservation-service', url: 'http://localhost:8004/health' },
            { name: 'payment-service', url: 'http://localhost:8005/health' },
            { name: 'notification-service', url: 'http://localhost:8006/health' },
            { name: 'analytics-service', url: 'http://localhost:8007/health' },
        ];
    }

    async checkAllServices() {
        const results = await Promise.allSettled(
            this.services.map(async (service) => {
                const response = await fetch(service.url);
                return {
                    name: service.name,
                    status: response.ok ? 'UP' : 'DOWN',
                    response: await response.json()
                };
            })
        );

        return results.map((result, index) => ({
            ...result.value,
            error: result.status === 'rejected' ? result.reason : null
        }));
    }
}
```

## 🚀 Step 7: Deployment

### Production Dockerfile Example
```dockerfile
# user-service/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8001

CMD ["npm", "start"]
```

### Kubernetes Deployment (Optional)
```yaml
# k8s/user-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: restaurant-app/user-service:latest
        ports:
        - containerPort: 8001
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: mongodb-uri
```

## 📊 Step 8: Monitoring & Logging

### Centralized Logging
```javascript
// shared/logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

module.exports = logger;
```

## 🔧 Step 9: Run Your Microservices

### Start All Services
```bash
# Build and start all services
docker-compose up --build

# Scale individual services
docker-compose up --scale user-service=3 --scale order-service=2

# View logs
docker-compose logs -f user-service
```

### Development Mode
```bash
# Start individual services locally
cd user-service && npm run dev
cd menu-service && npm run dev
# ... etc
```

## 🎯 Benefits Achieved

✅ **Scalability** - Scale individual services independently  
✅ **Resilience** - Circuit breaker prevents cascading failures  
✅ **Performance** - Parallel processing and load balancing  
✅ **Maintainability** - Smaller, focused codebases  
✅ **Team Development** - Different teams can work on different services  
✅ **Technology Diversity** - Use different tech stacks for different services  

## 🚨 Common Issues & Solutions

### Service Discovery Issues
- Use Consul or Eureka for dynamic service discovery
- Implement health checks and load balancing

### Data Consistency
- Use Saga pattern for distributed transactions
- Implement event-driven architecture with message queues

### Monitoring
- Use Prometheus + Grafana for metrics
- Implement distributed tracing with Jaeger

## 📚 Next Steps

1. **Implement Service Mesh** - Use Istio or Linkerd for advanced traffic management
2. **Add Message Queues** - Use RabbitMQ or Apache Kafka for async communication
3. **Implement CQRS** - Separate read and write models for better performance
4. **Add API Versioning** - Maintain backward compatibility
5. **Implement Rate Limiting** - Protect services from abuse

This microservices architecture will provide your restaurant app with enterprise-grade scalability and resilience!
