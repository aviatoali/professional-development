# Dockerize this API

Feel free to use the Dockerfile in the dockerized-react-app directory as a template.

1. Create a Dockerfile at this api project's root
2. Define your docker image in that Dockerfile
3. Use `docker build -t IMAGE_NAME DIRECTORY` to build your image
4. Run a container with your image using `docker run -p YOUR LOCAL PORT NUMBER:CONTAINER PORT NUMBER CONTAINERID or TAG`
ex: `docker run -p 5000:8000 mydockerimagetag`
