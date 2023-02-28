# pull official base image
FROM node:lts

RUN apt-get update
RUN wget -O /tmp/aws.deb https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
RUN dpkg -i /tmp/aws.deb
RUN rm /tmp/aws.deb

RUN npm install --global --unsafe-perm serve

# set working directory
WORKDIR /app
CMD ["serve", "-s", "build"]