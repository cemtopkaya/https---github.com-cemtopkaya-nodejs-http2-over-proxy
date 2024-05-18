# Docker image for terraform-openstack project
# Pull base image.
FROM node:current-bullseye-slim

RUN apt-get update

# bash-completion Paketi CLI araçları otomatik tamamlasın diye gerekli
# RUN apt install -y unzip wget tree curl jq bash-completion git inetutils-ping
RUN apt install -y git inetutils-ping

################################
# Install Whistle Proxy Server
################################

# Download terraform for linux
RUN npm install -g whistle

CMD tail -f /dev/null