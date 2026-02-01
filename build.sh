set -o errexit

pip install -r Backend/requirements.txt

# Move to the directory containing manage.py
cd Backend/restraunt

python manage.py collectstatic --noinput

if [ -n "$DATABASE_URL" ]; then
  echo "DATABASE_URL is set, running migrations..."
  python manage.py migrate
else
  echo "DATABASE_URL is NOT set. Skipping migrations during build."
fi
