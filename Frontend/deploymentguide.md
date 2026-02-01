# Professional Deployment Guide: GitLab CI/CD to Render

This guide explains how to set up a fully automated pipeline where your **Junior's Restaurant** web app is tested, containerized, and deployed to Render.

---

## Phase 1: GitLab Pipeline Setup

The first step is to tell GitLab how to build and check your code.

1.  Create a file named `.gitlab-ci.yml` in your project root.
2.  Paste this cod  1a         7e inside:

```yaml
image: node:latest

stages:
  - build
  - test
  - containerize
  - deploy

cache:
  paths:
    - node_modules/

# Step 1: Install and Build
build_job:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

# Step 2: Quality Check (Linting)
lint_job:
  stage: test
  script:
    - npm install
    - npm run lint

# Step 3: Build & Push Docker Image
docker_build:
  stage: containerize
  image: docker:latest
  services:
    - docker:dind
  variables:
    DOCKER_DRIVER: overlay2
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main

# Step 4: Trigger Render
deploy_job:
  stage: deploy
  script:
    - echo "Pipeline successful. Triggering Render deployment..."
    - curl -X POST $RENDER_DEPLOY_HOOK
  only:
    - main
```

---

## Phase 2: Docker Configuration

To build a container, you need a `Dockerfile`.

1.  Create a file named `Dockerfile` in your project root.
2.  Paste this content:

```dockerfile
# Build Stage
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3.  Create a `.dockerignore` file:
```text
node_modules
dist
.git
```

---

## Phase 3: GitLab Container Registry

GitLab has a built-in Container Registry to store your Docker images.

1.  In GitLab, go to **Deploy** > **Container Registry**.
2.  Once your `docker_build` job runs, your image will appear here as `registry.gitlab.com/your-username/your-project:latest`.

---

## Phase 4: Deploying a Container to Render

Render can pull your Docker image directly from GitLab.

1.  Log in to [Render.com](https://render.com).
2.  Click **New +** > **Web Service**.
3.  Choose **Existing Image**.
4.  **Configure Image Access:**
    - Render needs permission to pull from GitLab. 
    - Enter your image URL: `registry.gitlab.com/your-username/your-project:latest`.
    - Provide your GitLab **Deploy Token** (generated in GitLab under Settings > Repository > Deploy Tokens).
5.  Click **Create Web Service**.

---

## Phase 5: "Through GitLab" Integration (The Secret Sauce)

To make it deploy **through the GitLab pipeline** (so it only deploys if tests and builds pass):

### 1. Get the Hook from Render
1.  In your Render Dashboard, go to your Web Service.
2.  Click **Settings** on the left menu.
3.  Scroll down to the **Deploy Hook** section.
4.  Copy the URL.

### 2. Add the Hook to GitLab
1.  Go to your project in **GitLab**.
2.  On the left, go to **Settings** > **CI/CD** > **Variables**.
3.  Add `RENDER_DEPLOY_HOOK` with your URL.

### 3. Disable Auto-Deploy on Render
1.  In your Render Settings, set **Auto-Deploy** to **No**.

---

## Phase 6: Verification

1.  **Push a change** to `main`.
2.  Watch the GitLab Pipeline: **Build -> Test -> Containerize -> Deploy**.
3.  If all pass, Render will pull the new image and update your site.

**Congratulations! Your professional Containerized CI/CD pipeline is now live.**