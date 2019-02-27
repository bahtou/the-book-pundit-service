INSERT INTO ${schema~}.Review (book_id, reviews)
VALUES ( ${bookId}, ${reviews} )
ON CONFLICT ON CONSTRAINT Review_book_id_pk
DO NOTHING;
