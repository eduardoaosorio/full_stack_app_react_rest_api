# full_stack_app_react_rest_api

## Description

Client for [my previously created REST API](https://github.com/eduardoaosorio/rest_api_sql). This full stack application provides a way for users to administer a database containing information about courses. Users can interact with the database by retrieving a list of courses, view details for a specific course, as well as create, update and delete courses in the database.

In addition, the application requires users to create an account and sign in to make changes to the database.

## Technologies

- React
- React Context API
- React Router
- JavaScript
- Node.js
- Express
- SQLite
- Sequelize SQL ORM
- CSS
- Basic Auth
- Bcrypt

## How to use

1. Clone the repo.
2. Open 2 terminals (1 for the client and 1 for the API)
3. Install dependencies in the client and the API using `$ npm i` on each terminal.
4. Create an initial database with some dummy info by running `$ npm run seed` on the API's terminal.
5. Run `$ npm start` on each terminal. The client will automatically open a window on your browser. If this doesn't happen navigate to `http://localhost:3000`.
6. Start using the app. Create a new user or perhaps sign in as an existing user using one of the following credentials:
   - email: `joe@smith.com` password: `joepassword`
   - email: `sally@jones.com` password: `sallypassword`
