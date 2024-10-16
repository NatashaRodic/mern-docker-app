<div id="header" align="center">

</div>

# Dockerizing the Application

## This project is Dockerized, making it easy to build and run the application in a container.

 </div>

### Build the Docker image

To build your Docker image, run the following command:

```bash
docker build -t mern-app .
```

### Run the Docker container with environment variables:

Use the following command to run the Docker container while passing environment variables for MongoDB Atlas and any other configuration:

```
docker run -p 3001:3001 \
-e MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority" \
-e NODE_ENV=production \
mern-app
```

### Stopping the container:

To stop the running container, first list the running containers:

```
docker ps
```

Then stop the container using its container ID:

```
docker stop <container_id>
```

---
