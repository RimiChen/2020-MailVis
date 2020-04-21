FROM python:3-slim
EXPOSE 8080
WORKDIR /app
ADD requirements.txt ./
RUN pip install -r requirements.txt
ADD ./ ./
CMD [ "python", "./main.py" ]
