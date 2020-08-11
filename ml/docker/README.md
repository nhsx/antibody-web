# COVID-19 Antibody web service - ML Model

## Building the image locally

### Loading models

Models are loaded at Docker build time - when you build the image, any models inside the `models` directory will be added to the container and used when running it.

To load a specific model into the image, simply save it to the `models` directory and build the image.

### Building the image

Run the command:

```bash
docker build -t antibody-web-model:latest .
```

### Serving the image

Run the command

```bash
docker run --rm -it -p 8080:8080 -p 8081:8081 antibody-web-model:latest
```

## Calling the model

Once you have a model loaded (E.g. Nest101) you can call the model using the following CURL command:

```bash
curl -X POST http://localhost:8080/predictions/nest101 -T /path/to/image-file
```