FROM postgres:15.1

RUN apt-get update
RUN apt-get install -y wget
RUN wget -O /tmp/aws.deb https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
RUN dpkg -i /tmp/aws.deb
RUN rm /tmp/aws.deb
