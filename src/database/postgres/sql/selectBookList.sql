SELECT book_list
FROM ${schema~}.BookSearchList
WHERE search_book_title = ${ bookTitle };
