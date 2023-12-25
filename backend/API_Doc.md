## User Api

#### localhost:port/user/ -Get Req

- Get all the users in the database

#### localhost:port/user/signup -Post Req

- pass data in raw json format with name, email, password. the input data has to follow some standard. using express-validator package to sanitize and validate the data

#### localhost:port/user/login -Post Req

- pass data in raw json format with email, password. the input data has to follow some standard.
