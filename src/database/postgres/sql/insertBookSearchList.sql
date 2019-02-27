INSERT INTO ${schema~}.BookSearchList (search_book_title, book_list)
VALUES ( ${bookTitle}, ${bookList} )
ON CONFLICT ON CONSTRAINT BookSearchList_search_book_title_pk
DO NOTHING;
