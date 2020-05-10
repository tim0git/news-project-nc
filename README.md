# NC-BE-REDDIT-APP

Reddit web app written for backend block review May 2020.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

**Prerequisites**

- GitHub Account
- [VS Code](https://code.visualstudio.com/) - Free. Built on open source. Runs everywhere.
- [NODE](https://nodejs.org/en/) - JavaScript runtime built on [Chrome’s V8 JavaScript engine](https://v8.dev/) .
- HEROKU Account (hosted example)

### instructions \*\*

- Open your code editor and cd . Into a directory that you wish to clone the project into `$ cd <directorypath>`.

- If you wish to have a new directory for this project
  `$ mkdir <filename>`.

- open a web browser and goto [GitHub - tim0git/news-project-nc: Portfolio Piece NC News](https://github.com/tim0git/news-project-nc).

- Click on clone or download and copy the url.
  [GitHub - tim0git/news-project-nc: Portfolio Piece NC News](https://github.com/tim0git/news-project-nc.git)

- open the console and run the command.
  `$ git clone https://github.com/tim0git/news-project-nc.git`

_you should now have a file structure that looks like this_

```
be-nc-news
├─ .gitignore
├─ app.js
├─ controllers
│  ├─ api.controller.js
│  ├─ articles.controller.js
│  ├─ comments.controller.js
│  ├─ error.controllers.js
│  ├─ topics.controller.js
│  └─ users.controller.js
├─ db
│  ├─ connection.js
│  ├─ data
│  │  ├─ development-data
│  │  │  ├─ articles.js**
│  │  │  ├─ comments.js
│  │  │  ├─ index.js
│  │  │  ├─ topics.js
│  │  │  └─ users.js
│  │  ├─ index.js
│  │  └─ test-data
│  │     ├─ articles.js
│  │     ├─ comments.js
│  │     ├─ index.js
│  │     ├─ topics.js
│  │     └─ users.js
│  ├─ migrations
│  │  ├─ 20200504113636_topics.js
│  │  ├─ 20200504115729_users.js
│  │  ├─ 20200504120726_articles.js
│  │  └─ 20200504122106_comments.js
│  ├─ seeds
│  │  └─ seed.js
│  ├─ setup.sql
│  └─ utils
│     └─ utils.js
├─ endpoints.json
├─ listen.js
├─ model
│  ├─ articles.model.js
│  ├─ comments.model.js
│  ├─ topics.model.js
│  └─ users.model.js
├─ package-lock.json
├─ package.json
├─ routers
│  ├─ api.router.js
│  ├─ articles.router.js
│  ├─ comments.router.js
│  ├─ topics.router.js
│  └─ users.router.js
└─ spec
   ├─ app.spec.js
   └─ utils.spec.js
```

- create your knex file and locate it in the root directory be-nc-news.

_the file should look like below_

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
  connection: {
      database: '<insert database>'
      user: '<insert username>'
      password: '<insert password>'
    }
  },
  test: {
    connection: {
      database: '<insert database>'
      user: '<insert username>'
      password: '<insert password>'
    }
  },
  production: {
    connection: {
      connectionString: '<insert URL for hosted database>',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

- To install the required modules

```
 "dependencies": {
    "express": "^4.17.1",
    "knex": "^0.21.1",
    "pg": "^8.0.3"
  },
  "devDependencies": {
    "jest": "^25.5.4",
    "jest-sorted": "^1.0.6",
    "supertest": "^4.0.2"
  },
```

Run in the command line
`$ npm install`

- finally add the below code to the end of your package.json file. This will enable Jest Sorted to run.

```
”jest”: {
    “setupFilesAfterEnv”: [
      “jest-sorted”
    ]
  }
```

## Running scripts

**the following scripts have been provided to aide in test, dev and deployment** _step by step instructions below_

```
  "scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "start": "node listen.js",
    "seed-test": "NODE_ENV=test knex seed:run",
    "seed-dev": "NODE_ENV=development knex seed:run",
    "test-utils": "jest spec/utils.spec.js",
    "test": "jest --watch spec/app.spec.js",
    "migration": "knex migrate:make",
    "latest-test": "NODE_ENV=test knex migrate:latest",
    "rollback-test": "NODE_ENV=test knex migrate:rollback",
    "latest-dev": "NODE_ENV=development knex migrate:latest",
    "rollback-dev": "NODE_ENV=development knex migrate:rollback",
    "sql-text": "psql -f query.sql > query.txt",
    "seed:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex seed:run",
    "migrate-latest:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex migrate:latest",
    "migrate-rollback:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex migrate:rollback"
  },
```

## Set up Database

- follow the instructions in the link to install and set up Postgres on your local machine. [PostgreSQL: Documentation: 10: Chapter 1. Getting Started](https://www.postgresql.org/docs/10/tutorial-start.html)

- Once Postgres is install and running run script;
  `$ npm run setup-dbs`
  _we will set up the dev and test database at the same time this is so that you don’t need to do this later_

- Once data base have been set-up _see confirmation in console_

  - run the following command to create the tables for the test database.
    `$ npm run latest-test`
    \*Use the KNEX migration tables to ensure that if necessary you can rollback the database to a last know good configuration.\*

- in order to seed the database with the test data run the following command;
  `$ npm run seed-test`

- congratulations you now have a seeded test database, to set up the development database repeat the above sequence using the following commands. Remember we have setup the dev database therefore **do not run setup-db**.

```
npm run latest-dev
$ npm run seed-dev
```

### Running the tests

**pre requisites**

- [JEST](https://jestjs.io/en/) -Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [superagent](http://github.com/visionmedia/superagent) - HTTP assertions made easy via superagent .
- [postgresql](https://www.postgresql.org/) - powerful, open source object-relational database.

_There are two test suits available_

```
└─ spec
   ├─ app.spec.js //test to ensure that the REST API routes behave as expected.
   └─ utils.spec.js // tests to ensure that the data manipulation required to seed the database has ocoured correctly and that the functions written are pure and have no unwanted behaviour.
```

To run both test suites;
`$ npm run test`

To Run API Routes tests;
`$ npm run test api`

To Run Data manipulation function tests;
`$ npm run test spec`

### Deployment

There are many ways to host applications like the one you have created. One of these solutions is Heroku. Heroku provides a service that you can push your code to and it will build, run and host it. Heroku also allows for easy database integration. Their [documentation](~https://devcenter.heroku.com/articles/getting-started-with-nodejs~) is excellent, so take a look at that. This document is essentially a more condensed, specific version of the steps described in the Heroku docs.

**## 1. Install the Heroku CLI**

On macOS:

```bash
brew tap heroku/brew && brew install heroku
```

…or Ubuntu:

```bash
sudo snap install --classic heroku
```

**## 2. Create a Heroku App**

Log into Heroku using their command line interface:

```bash
heroku login
```

Create an app in an active git directory. Doing this in the folder where your server exists is a good start, as this is what you will be hosting.

```bash
heroku create your-app-name
```

Here `your-app-name` should be the name you want to give your application. If you don’t specify an app name, you’ll get a random one which can sometimes be a bit iffy.

This command will both create an app on Heroku for your account. It will also add a new `remote` to your git repository.
Check this by looking at your git remotes:

```bash
git remote -v
```

**## 3. Push Your code up to Heroku**

```bash
git push heroku master
```

**## 4. Creating a Hosted Database**

Go to the heroku site and log in.

- Select your application
- `Configure Add-ons`
- Choose `Heroku Postgres`

The free tier will be adequate for our purposes. This will provide you with a `postgreSQL` pre-created database!

Check that the database exists. Click `settings` on it, and view the credentials. Keep an eye on the URI. Don’t close this yet!

**## 5. Seeding the Production Database**

Check that your database’s url is added to the environment variables on Heroku:

```bash
heroku config:get DATABASE_URL
```

If you are in your app’s directory, and the database is correctly linked as an add on to Heroku, it should display a DB URI string that is exactly the same as the one in your credentials.

```js
const { DB_URL } = process.env;
// ...
const customConfigs = {
  // ...
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
// ...
```

It is critical to set the `ssl.rejectUnauthorized` property to `false`, otherwise we will not be able to connect to the hosted database from your local machine. **This has been done for you**

In your `package.json`, you have been provided with the following scripts.

```json
{
  "scripts": {
    "seed:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex seed:run",
    "migrate-latest:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex migrate:latest",
    "migrate-rollback:prod": "NODE_ENV=production DB_URL=$(heroku config:get DATABASE_URL) knex migrate:rollback"
  }
}
```

Each of these will establish an environment variable called `DB_URL`, and set it to whatever heroku provides as your DB URL. It is essential that you do this as the DB URL may change! This deals with a lack of predictability on heroku’s end.

Make sure to \***\*run the seed prod script\*\*** from your `package.json`:

```bash
npm run seed:prod
```

**## 6. Connect To The Hosted Database when on Heroku**

Commit your changes, and push to heroku master.

```bash
git push heroku master
```

**## 9. Review Your App**

```bash
heroku open
```

Any issues should be debugged with:

```bash
heroku logs --tail
```

### Built With

- [NODE](https://nodejs.org/en/) - JavaScript runtime built on [Chrome’s V8 JavaScript engine](https://v8.dev/) .
- [EXPRESS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/)
- [KNEX](http://knexjs.org/) - a “batteries included” SQL query builder for **Postgres**
- [postgresql](https://www.postgresql.org/) - powerful, open source object-relational database.

### Contributing

Please read [CONTRIBUTING.md](https://github.com/tim0git/news-project-nc/graphs/contributors) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [GitHub](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags) .

### Authors

- **Timothy Doolan** - _Initial work_ - [tim0git](https://github.com/PurpleBooth)
  See also the list of [contributors](https://github.com/tim0git/news-project-nc/graphs/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/tim0git/news-project-nc/blob/master/LICENSE) file for details.

### Acknowledgments

- Inspiration - [reddit: the front page of the internet](https://www.reddit.com/)
- Northcoders - [Northcoders | The Coding Bootcamp For The North](https://northcoders.com/)
