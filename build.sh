set -o errexit

pip install -r Backend/requirements.txt

python Backend/restraunt/manage.py collectstatic --noinput
python Backend/restraunt/manage.py migrate
