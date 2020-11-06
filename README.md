# auth

Auth Server in Node/Express/Mongo. </br>
Deploy (production) : https://auth-cvs.herokuapp.com/(auth)

### Concept

Following the concept of micro-service, and as it seems to be a best practive to separate the Auth server from the rest of the backend, here comes a Auth only server. </br>
More detail here: https://security.stackexchange.com/questions/83450/why-would-you-decouple-your-resource-and-login-servers

### Open question How to use this with several project?

- Have all user of all project in one user table?
- Have the client sending a parameter pointing to a user_table?
