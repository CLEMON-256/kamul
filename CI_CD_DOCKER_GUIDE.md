# Professional CI/CD & Dockerization Guide

This guide explains how to containerize Junior's Restaurant app using Docker and automate your deployment using a CI/CD Pipeline (GitHub Actions) to Render.

---

## 1. What is Containerization?
Containerization (using **Docker**) wraps your application and all its dependencies (libraries, Python version, Node version) into a single "image". This ensures the app runs exactly the same on your computer, a collaborator's computer, and Render's servers.

---

## 2. Dockerizing the Backend (Django)

Create a `Dockerfile` inside your `Backend/restraunt/` folder:

```dockerfile
# Use an official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install dependencies
COPY ../requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "restraunt.wsgi:application"]
```

---

## 3. Dockerizing the Frontend (React + Vite)

Create a `Dockerfile` inside your `Frontend/` folder:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 4. Building the CI/CD Pipeline (GitHub Actions)

A pipeline automatically builds your Docker image every time you "push" code to GitHub.

Create a folder: `.github/workflows/`
Create a file: `main.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Build Docker Image (Backend)
        run: docker build -t my-restaurant-backend ./Backend/restraunt

      - name: Build Docker Image (Frontend)
        run: docker build -t my-restaurant-frontend ./Frontend

      - name: Deploy to Render
        run: |
          # This command tells Render to start a new deploy
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_BACKEND }}
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_FRONTEND }}
```

---

## 5. Deploying to Render via Docker

Instead of giving Render your code, you now give it your **Docker Image**.

1.  **New Web Service** > **Deploy an existing image**.
2.  Choose your repository.
3.  **Environment**: select `Docker`.
4.  Render will automatically find your `Dockerfile` and build the container.

---

## Summary of Benefits:
- **Automation**: You never have to manually click "Deploy" again. Just `git push` and it's live.
- **Reliability**: If the "Build" step fails in the pipeline, the old version of your site stays up (no downtime).
- **Consistency**: Docker eliminates the "it works on my machine" problem.
