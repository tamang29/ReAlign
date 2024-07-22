# prototype
ReAlign is an all-in-one requirements engineering platform designed to streamline the documentation and management of project requirements.

## Table of Contents
- [Development Setup](#development-setup)
- [Running the Project Locally](#running-the-project-locally)
- [Running the Project in Docker](#running-the-project-in-docker)

## Development Setup
1. Clone the project
    ```
    git clone git@gitlab.lrz.de:seba-master-2024/team-41/prototype.git
    cd prototype
    ```
2. Rename the file .env.example to .env for MongoDB access.

3. Install dependencies for backend application
    ```
    cd backend
    npm install
    ```
4. Install dependencies for frontend application
    ```
    cd frontend
    npm install
    ```

## Running the project locally
To start the project locally follow these steps:

- Start the nodejs application
    ```
    cd backend
    npm start
    ```
- Start Reactjs app

    ```
    cd frontend
    npm start
    ```

## Running the project in Docker

To start the project in a Docker container:

```
docker compose up
```

The backend application will be served on ```localhost:3000:3000``` and the frontend application will be served on ```localhost:3001:80```.
