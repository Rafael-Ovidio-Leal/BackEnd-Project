## The BackEnd-Project

This is a challenge by [Coodesh](https://coodesh.com/)

## What is Contentful?

Project aimed at using data from the Open Food Facts project, with a CRON system to import data once a day from the [Open Food Facts](https://br.openfoodfacts.org/data) database. It also includes routes for paginated product search, searching for specific products based on their "code," as well as modification and removal of products from the database.

## Requirements

* Node
* Git
* Docker

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

```bash
npm install
```

## Steps for run project

Step 1: Go to the application root and create .ENV with the following variables `DB_CONNECTION`, `BASE_URL_API`, `BASE_URl_FILES`.

Step 2: Populate env variables [`BASE_URL_API`](https://challenges.coode.sh/food/data/json/) URL to get .gz files, [`BASE_URl_FILES`](https://challenges.coode.sh/food/data/json/index.txt) URL with all available files. Replace the `DB_CONNECTION` with a MongoDB database string connection.

Step 3: To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:9000](http://localhost:9000) and take a look around.

Here's the route documentation in Postman to assist with how to use the routes: [Postman](https://documenter.getpostman.com/view/26379534/2s93JzKf72)


## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
```

Step 2: Build the Docker image

```bash
docker-compose build
```

Step 3: Run the Docker container locally:

```bash
docker-compose up -d
```


