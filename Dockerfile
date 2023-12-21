FROM alpine:latest
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add py3-pip
COPY ./src/ /home/art/src
RUN python3 -m venv /venv
RUN su -c 'chmod +x ./venv/bin/activate'
RUN source /venv/bin/activate
RUN apk add py3-flask
EXPOSE 8081
CMD ["/bin/sh", "-c", "python3 /home/art/src/api/api.py"]
