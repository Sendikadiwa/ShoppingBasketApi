# SHOPPING BASKET REST API

[![Maintainability](https://api.codeclimate.com/v1/badges/fdd7818f671514fff2e8/maintainability)](https://codeclimate.com/github/sendistephen/shopping_basket_api/maintainability) [![Coverage Status](https://coveralls.io/repos/github/sendistephen/shopping_basket_api/badge.svg)](https://coveralls.io/github/sendistephen/shopping_basket_api)


Shopping Basket is an application that helps users create a list of items they want to buy so that they can keep track of them.

## Key Features

- User can create an account and login
- User can create,view,update and delete a shopping basket
- User can create, view update and delete an item from a shopping basket

## Tools

- [Apiary](https://apiary.io/) - used for documenting the api
- [Express.js](https://expressjs.com/) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MongoDB](https://www.mongodb.com/) - MongoDB is a document database with the scalability and flexibility of querying and indexing data
- [Mongoose](https://mongoosejs.com) - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
- [Jest](https://jestjs.io/docs/en/getting-started) - Jest is an open JavaScript testing library from Facebook.
- [Node]() - Node is JavaScript run-time environment that executes JavaScript code outside of a browser.

## Getting started

Make sure you have Node.js(v10.16.0), npm(v6.9.0) & mongodb installed on your machine.

#### Clone this repository and cd into it.

```
git clone https://github.com/sendistephen/shopping_basket_api.git && cd shopping_basket_api
```

#### Install all project dependencies.

```
npm install
```

#### Mongo connection setup
Edit your /config/default.json file to include the correct MongoDB URI

#### Setup environment variables.

Copy and paste the info below in your terminal respectively

MAC

```
export shoppingbasket_secretOrPrivateKey=yoursecretkey
```

WINDOWS

```
set shoppingbasket_secretOrPrivateKey=yoursecretkey
```

#### Start the Application

```
npm run dev  # Runs on http://localhost:9000
```

#### To run tests

```
npm run test
```

### Working Endpoints

| Endpoint                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| POST /api/v1/users                  | Registers a User                                         | Public  |
| POST /api/v1/auth                   | Login a user                                             | Public  |
| POST /api/v1/baskets                | Create a new basket                                      | Private |
| GET /api/v1/baskets                 | Get all baskets created by user.                         | Private |
| PUT /api/v1/baskets/:id             | Updates a basket with a given id                         | Private |
| GET /api/v1/baskets/:id/items       | Gets items of a specific basket given its id             | Private |
| POST /api/v1/baskets/:id/items      | Adds items to a specific basket with the given basket id | Private |
| DELETE /api/v1/baskets/:id/item/:id | Deletes an item from the basket                          | Private |
| PUT /api/v1/baskets/:id/item/:id    | Updates a basket item on a given basket                  | Private |
