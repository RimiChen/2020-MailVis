# MailVis
To extend previous email visualization project with the new prototype. 
Going to improve the filter interface and the visualization display. 
Will make these a data visualization library.

## Interaction
Once you have started the web server (see below for options), you can access the app via a browser at `localhost:8080` or at a port of your choosing.

## Install
```bash
pip install -r requirements.txt
```

## Run
The flask web server runs on port 8080.
```
python main.py
```

## Docker
First build the docker image.
```bash
docker build -t <tag> .
```
Then you can run the container. Internally the system uses port 8080 but docker can expose this port to a port of your choosing or a random port using `-P`. If no ports are exposed you will not be able to access the web interface.
```bash
docker run [-t] [--rm] [-P|-p <port>:8080] <tag>
```
