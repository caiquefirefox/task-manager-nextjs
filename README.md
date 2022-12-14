# Task Manager

A simple task manager application developed with [Next.js](https://nextjs.org/) to academic learning.

## Architecture

The application is monolithic and divided in two subapplication in the same directory, the first is a backend and the second is the frontend, both made with NextJs.

## Running The App

Initially it was necessary to create the application with the command:

```bash
npx create-react-app "Name of project"
```
It was also necessary to install the dependencies below using the command "npm i name-of-package":

### Backend dependencies
- jsonwebtoken
- @types/jsonwebtoken (using -D parameter)
- md5
- @types/md5 (using -D parameter)
- moment
- mongoose

### Frontend dependencies
- react-bootstrap
- bootstrap@4.6.0 
- node-sass

To run the project you need to run the command in bash:

```bash
node run dev
```

The project is using NoSql database using docker compose, so you need to run the command below:

```bash
docker-compose up -d
```
