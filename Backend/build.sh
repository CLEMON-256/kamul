#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python restraunt/manage.py collectstatic --no-input
python restraunt/manage.py migrate

# Run seeding scripts
cd restraunt
python seed_db.py
python update_menu_images.py
