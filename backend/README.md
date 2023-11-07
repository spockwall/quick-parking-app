# How to run
1. ```npm install```
2. Set Up the ElephantSQL Database(https://www.elephantsql.com/)
3. Locate and copy the URL under the "Details" section
4. Create a new file named .env. Inside the .env file, add the following line:```DATABASE_URL=<Your-Copied-Database-URL>```
5. ```npx prisma init```
6. ```npx prisma db push```:try to update the db according schema.prisma
7. ```npm start```