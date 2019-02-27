# The Book Pundit Service

Service that manages database connections & API calls for The Book Pundit application.

In order to run the full application [The Book Pundit APIs](https://github.com/bahtou/the-book-pundit-apis) must also be running.

## Run

`docker-compose up -d`

## APIs

### /search?q=<search_term>

**search_term** cannot be a number

### /reviews/:bookId

**bookId** must be a number

## Endpoints

### gr-api

* /gr/books/search?q=<search_term>
* /gr/books/${bookId}/reviews;

### postgres

* getBookList
* getBookReviews
* insertIntoBookSearchList
* insertIntoReview

## Init Database

`psql -U pundit -d thebookpundit -a -f ./database/init.sql -v ON_ERROR_STOP=1 -1`
