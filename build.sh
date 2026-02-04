#!/usr/bin/env bash
# Exit on error
set -o errexit

if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL is not set. The build process cannot run migrations."
    echo "Check your Render Environment Variables."
else
    echo "DATABASE_URL is set (starting with ${DATABASE_URL:0:15}...)"
fi

# Install dependencies
pip install -r Backend/requirements.txt

# Store current directory
BASE_DIR=$(pwd)

# Move to Django project directory
cd Backend/restraunt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

# Seed the database with initial data
python seed_db.py

# Update menu item images
python update_menu_images.py

# Return to base dir (optional, but good practice)
cd $BASE_DIR
