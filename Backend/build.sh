set -o errexit

pip install -r requirements.txt

python restraunt/manage.py collectstatic --noinput
python restraunt/manage.py migrate
