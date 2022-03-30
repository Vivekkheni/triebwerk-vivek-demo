# How Long to Read

## Initial setup

Install Docker if you don't have it.

Install `npm` if you don't have it.

Install `sass` globally using `npm i -g sass`, or `brew install sass` on Mac.

Create a file `.env` in the root directory of the repo

```
DB_HOST=<ASK_FOR_VALUE>
DB_NAME=<ASK_FOR_VALUE>
DB_USER=<ASK_FOR_VALUE>
DB_PASSWORD=<ASK_FOR_VALUE>

SESSION_SECRET=<ASK_FOR_VALUE>

GOODREADS_SECRET=<ASK_FOR_VALUE>
SENDGRID_API_KEY=<ASK_FOR_VALUE>
```

Create a file `.npmrc` in the `client` directory of the repo, i.e. `client/.npmrc`

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=<ASK_FOR_VALUE>
```

Change `AUDIBLE_URL` in `server/src/config.js` to your country's Audible URL if applicable.

Install packages in the client directory

```
npm i --prefix client
```

Download MySQL workbench to connect to the development database.

## Running the frontend and backend locally

Start the server in dev mode (must be in root folder)

```bash
docker-compose up --build
```

Visit the server on [localhost:3000/version] to verify that it's running.

Start the frontend in dev mode

```bash
cd client
npm run dev
```

Run the sass compiler in a different terminal window to watch for changes

```bash
npm run sass
```

Visit the website on [localhost:3001] to verify that it's running.

## Making changes

Make a branch off of dev

```bash
git checkout dev
git checkout -b <YOURNAME>/dev
```

Format your code before committing

```bash
cd <server or client>
npm run format
```

## Making database schema changes

Download [MySQL Workbench](https://dev.mysql.com/doc/workbench/en/wb-installing-windows.html) and connect to the remote DB to see and verify changes.

To make a new migration:

```bash
cd server
sequelize migration:generate --name <NAME>
```

Write the migration by editing the file.

Remove the `!IS_DEV` condition in `server/src/models/index.js` and run the backend to run the migration.

## Deploying changes

Run

```bash
sh deploy.sh
```
