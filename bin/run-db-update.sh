#!/bin/bash
set -ex

if [[ "$2" == "--force" ]]; then
    python manage.py update_security_advisories --quiet --clear-db
    python manage.py update_release_notes --quiet --force
    python manage.py update_externalfiles --quiet --force
    python manage.py update_www_config --quiet --force
else
    python manage.py update_security_advisories --quiet
    python manage.py update_release_notes --quiet
    python manage.py update_externalfiles --quiet
    python manage.py update_www_config --quiet
fi
python manage.py update_product_details_files
python manage.py update_wordpress --quiet
python manage.py update_newsletter_data --quiet

if [[ "$1" == "--all" ]]; then
    # less frequent. these will modify the DB every time.
    # TODO fix this
    python manage.py cron update_tweets
    python manage.py cron update_ical_feeds
fi
