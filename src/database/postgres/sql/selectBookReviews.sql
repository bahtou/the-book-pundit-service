SELECT reviews
FROM ${schema~}.Review
WHERE book_id = ${ bookId };
