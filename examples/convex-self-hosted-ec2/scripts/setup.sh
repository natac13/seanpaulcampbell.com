#!/bin/bash

# This script is used to setup the EC2 instance for the Convex backend.

mkdir -p /home/ubuntu/convex-backend

curl -o /home/ubuntu/convex-backend/docker-compose.yml https://raw.githubusercontent.com/get-convex/convex-backend/main/self-hosted/docker/docker-compose.yml

touch /home/ubuntu/convex-backend/.env
# remove due to interpolation in the sst.config.ts file
# cat > /home/ubuntu/convex-backend/.env << EOL
# AWS_ACCESS_KEY_ID=${convexUserAccessKey.id}
# AWS_SECRET_ACCESS_KEY=${convexUserAccessKey.secret}
# AWS_REGION=us-east-1

# S3_STORAGE_EXPORTS_BUCKET=${exportsBucket.name}
# S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET=${snapshotImportsBucket.name}
# S3_STORAGE_MODULES_BUCKET=${modulesBucket.name}
# S3_STORAGE_FILES_BUCKET=${filesBucket.name}
# S3_STORAGE_SEARCH_BUCKET=${searchBucket.name}
# S3_ENDPOINT_URL=https://s3.us-east-1.amazonaws.com

# MYSQL_URL=mysql://${database.username}:${database.password}@${database.host}:${database.port}

# DO_NOT_REQUIRE_SSL=true
# REDACT_LOGS_TO_CLIENT=true

# CONVEX_CLOUD_ORIGIN=http://api.${domain}
# CONVEX_SITE_ORIGIN=http://${domain}

# EOL

# these only need to be run if the command to make the directory is not run by the `ubuntu` user
# chmod 600 /home/ubuntu/convex-backend/.env
# chown -R ubuntu:ubuntu /home/ubuntu/convex-backend

# Remove old docker packages
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg -y; done

# Install docker & nginx
sudo apt-get update -y
sudo apt-get install ca-certificates curl nginx -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Add the current user to the docker group
usermod -aG docker ubuntu
newgrp docker # this is needed to add the current user to the docker group

# Start and enable Docker
systemctl start docker
systemctl enable docker

touch /etc/nginx/sites-available/convex-backend
# remove due to interpolation in the sst.config.ts file
# cat > /etc/nginx/sites-available/convex-backend << EOL
# server {
#     listen 80;
#     server_name ${domain};

#     location / {
#         proxy_pass http://localhost:3210;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }

# server {
#     listen 80;
#     server_name api.${domain};

#     location / {
#         proxy_pass http://localhost:3211;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }

# server {
#     listen 80;
#     server_name dashboard.${domain};

#     location / {
#         proxy_pass http://localhost:6791;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }
# EOL

ln -sf /etc/nginx/sites-available/convex-backend /etc/nginx/sites-enabled/

systemctl restart nginx
systemctl enable nginx

# Navigate to the directory with docker-compose.yml and .env
# and run docker compose up.
# The chown ensures that ubuntu user can manage files if needed later,
# but docker compose up itself will be run by root here.
cd /home/ubuntu/convex-backend
docker compose up -d

# Install certbot
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

snap set certbot trust-plugin-with-root=ok
snap install certbot-dns-route53

## setup aws credentials on the root user
sudo su -
mkdir -p ~/.aws
touch ~/.aws/credentials

# cat > ~/.aws/credentials << EOL
# [default]
# aws_access_key_id = <your-access-key-id>
# aws_secret_access_key = <your-secret-access-key>
# EOL

#certbot certonly --dns-route53 -d <your-domain> -d api.<your-domain> -d dashboard.<your-domain>

# check on docker
# docker ps
