FROM docker/whalesay:latest
LABEL Name=sparkly-studio-client Version=0.0.0
RUN apt-get -y update && apt-get install -y fortunes
CMD /usr/games/fortune -a | cowsay
