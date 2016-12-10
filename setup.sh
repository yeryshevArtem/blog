#!/bin/bash

echo "Provisioning virtual machine..."

ROOT_DIR=/home/vagrant/projects/blog
POSTGRE_VERSION=9.3
DB_NAME='blog'
DB_USER='root'
DB_PORT='5432'
DB_PASSWORD='12345678'

echo "Repository update..."
echo vagrant | sudo -S apt-get update > /dev/null

echo "Installing basic things..."
echo vagrant | sudo -S apt-get install git python-software-properties build-essential libpq-dev -y > /dev/null
echo vagrant | sudo -S touch /var/lib/cloud/instance/locale-check.skip
echo vagrant | sudo -S locale-gen en_US en_US.UTF-8 > /dev/null
echo 'export LC_CTYPE=en_US.UTF-8' >> ~/.bashrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bashrc
source ~/.bashrc

echo "Installing Node.js and npm..."
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing postgresql"
echo vagrant | sudo -S apt-get install -y postgresql=$POSTGRE_VERSION\* > /dev/null
echo vagrant | sudo -S -u postgres psql -c "CREATE ROLE $DB_USER LOGIN UNENCRYPTED PASSWORD '$DB_PASSWORD' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;" > /dev/null
echo vagrant | sudo -S -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER" > /dev/null
echo vagrant | sudo -S sed -i 's@#listen_addresses@listen_addresses@' /etc/postgresql/$POSTGRE_VERSION/main/postgresql.conf  #?????????

echo vagrant | sudo -u $DB_USER psql $DB_NAME < /home/vagrant/projects/blog/dump.sql #posts table
echo vagrant | sudo -u $DB_USER psql $DB_NAME < /home/vagrant/projects/blog/sessions.sql  #session table
echo vagrant | sudo -u $DB_USER psql $DB_NAME < /home/vagrant/projects/blog/users.sql  #users table
echo vagrant | sudo -u $DB_USER psql $DB_NAME < /home/vagrant/projects/blog/test.sql
