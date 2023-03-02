# pull official base image
FROM node:lts
WORKDIR /app

RUN apt-get update
RUN wget -O /tmp/aws.deb https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
RUN dpkg -i /tmp/aws.deb
RUN rm /tmp/aws.deb

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Files required by pnpm install
# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./
RUN pnpm fetch

ADD . ./
RUN pnpm install -r
CMD ["pnpm", "start"]