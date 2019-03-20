# The Book Pundit Service

Service that manages database connections & API calls for The Book Pundit application.

In order to run the full application [The Book Pundit APIs](https://github.com/bahtou/the-book-pundit-apis) must also be running.

## Build & Run

`docker-compose build`

`docker-compose up -d`

>An external docker network `api_net` needs to exist in order for the application to function. Run the following command if the network has not been created

`docker network create api_net`

## APIs

### /search?q=<search_term>

**search_term** cannot be a number

### /reviews/:bookId

**bookId** must be a number

## Endpoints

### API-GR

* /gr/books/search?q=<search_term>
* /gr/books/${bookId}/reviews;

### postgres

* getBookList
* getBookReviews
* insertIntoBookSearchList
* insertIntoReview

## Init Database

`psql -U pundit -d thebookpundit -a -f ./database/init.sql -v ON_ERROR_STOP=1 -1`

## Vultr Provisioning

Helpful [APIs](https://www.vultr.com/api/)

### docker-machine

**Use `docker-machine` to create nodes on Vultr**

`docker-machine create --driver vultr --vultr-api-key=<ENTER-HERE> --vultr-region-id=3 --vultr-plan-id=202 --vultr-os-id=244 --vultr-ssh-key-id=<ENTER-HERE> --vultr-ipv6=true --vultr-tag=manager node1`

### SSL

follow this setup https://www.vultr.com/docs/setup-letsencrypt-on-linux

### NOTES

Use `docker-machine` copy files from local to remote

`docker-machine scp ./docker-compose.prod.yml root@node1:/home/the-book-pundit-service/docker-compose.prod.yml`

**copy recursively**  
`docker-machine scp -r ./database root@node1:/home/the-book-pundit-service/database`
