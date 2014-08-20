#Cougar

Tournament tracking app.

### Stack/Frameworks used
  - Node
  - Express
  - Angular
  - Postgres
  - Bootstrap

## Set-up

1. Install node via [Homebrew](http://brew.sh/) to begin. All tools are node based and require node and npm.

  ```brew install node```

2. Install postgresql.

  Using [postgres.app](http://postgresapp.com/) is the easiest way to get started.

## Installation

1. Clone the git repo: ```git clone git@github.com:mpolun-mdsol/cougar.git```
2. CD into the directory and run npm install: ```npm install```
3. Make sure you have postgres (and the commandline tools) installed
4. create a root user if you don't have one: ```createuser -s root```
5. Create the database: ```npm run-script create-db```
6. Run the migrations: ```npm run-script migrate```
7. Run bower ```bower install```
8. Run ```grunt build```
9. Run ```grunt```

## Debugging
Use ```node-inspector``` then visit http://127.0.0.1:8080/debug?port=5858
