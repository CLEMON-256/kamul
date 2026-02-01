# Deploying Junior's Restaurant App to Render

This guide provides step-by-step instructions on how to deploy your Django backend and Vite frontend to [Render](https://render.com).

---

## Prerequisites

1.  A **GitHub** or **GitLab** account with your code pushed to a repository.
2.  A **Render** account.
3.  Ensure your `Backend/requirements.txt` is up to date.

---

## 1. Deploying the PostgreSQL Database

Before deploying the backend, you need a database.

1.  Log in to Render and click **New +** > **PostgreSQL**.
2.  **Name**: `restraunt-db`
3.  **Database**: `restraunt_db`
4.  **User**: `postgres`
5.  Click **Create Database**.
6.  **Important**: Copy the **Internal Database URL** for the backend and the **External Database URL** for your local migrations (if needed).

---

## 2. Deploying the Backend (Django)

1.  Click **New +** > **Web Service**.
2.  Connect your repository.
3.  **Name**: `junior-restaurant-backend`
4.  **Root Directory**: `Backend/restraunt`
5.  **Environment**: `Python`
6.  **Build Command**:
    ```bash
    pip install -r ../requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
    ```
7.  **Start Command**:
    ```bash
    gunicorn restraunt.wsgi:application
    ```
8.  **Environment Variables**:
    Click **Advanced** > **Add Environment Variable**:
    - `DATABASE_URL`: (Paste your Internal Database URL here)
    - `SECRET_KEY`: (Your Django secret key)
    - `DEBUG`: `False`
    - `ALLOWED_HOSTS`: `junior-restaurant-backend.onrender.com` (Your Render URL) or `*`

---

## 3. Deploying the Frontend (Vite)

1.  Click **New +** > **Static Site**.
2.  Connect your repository.
3.  **Name**: `junior-restaurant-frontend`
4.  **Root Directory**: `Frontend`
5.  **Build Command**: `npm install && npm run build`
6.  **Publish Directory**: `dist`
7.  **Environment Variables**:
    - `VITE_API_URL`: `https://junior-restaurant-backend.onrender.com` (Link to your backend)

---

## 4. Final Touches (CORS & Security)

1.  Update your `Backend/restraunt/restraunt/settings.py`:
    - Add your frontend URL to `CORS_ALLOWED_ORIGINS`.
    - Install `dj-database-url` and `gunicorn` in `requirements.txt`.
2.  **WhiteNoise**: It's highly recommended to use `whitenoise` to serve static files in production. Add it to your `MIDDLEWARE` in `settings.py`.

---

## Need Help?
If you run into any "Build Failed" errors, check the **Logs** tab on Render for specific error messages.
