# How to start the backend
### 1. Create a .env file in the root of the backend folder
``` 
DATABASE_URL='Your database url'
JWT_SECRET_KEY='Your secret key'
```
*Note: Plz create the db and get your database url from(https://www.elephantsql.com)
### 2. Launch Docker Desktop in your machine
### 3. Launch the service
```
docker-compose up -d --build
```