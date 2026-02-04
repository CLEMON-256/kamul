#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies from the parent directory
pip install -r ../requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

# Seed the database with initial data
python seed_db.py

# Update menu item images
python update_menu_images.py
