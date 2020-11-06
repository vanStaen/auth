# auth

Auth Server in Node/Express/Mongo. </br>
Deployed on:https://auth-cvs.herokuapp.com/(auth)

## Concept

Following the concept of micro-service, and as it seems to be a best practice to separate the Auth server from the rest of the backend, here comes an Auth only server. </br>

## API Endpoint

### Auth

- inputs : `email` and `password`
- outputs : `userId`, `userEmail`, `token`, `refreshToken`

The token expiration is 15 minutes. The refresh token expires after 7 days. Every refresh token generated are getting saved in the database. See model "Token".

### Token

- inputs : `refreshToken`
- outputs : `token`

The endpoint delivers a token to anyone in possession of a valid refresh token.

### Logout

- inputs : `refreshToken`
- outputs : null

The endpoint deletes a refresh token from the database

## Open question: How to use this with several project?

- Have all user of all project in one user table?
- Have the client sending a parameter pointing to a user_table?
