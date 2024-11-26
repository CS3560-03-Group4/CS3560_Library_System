-- Search books by a keyword

SELECT "bookID", "title", "author", "datePublished", "imageURL"
FROM "Book"
WHERE LOWER("title") LIKE '%' || LOWER($1) || '%'
   OR LOWER("author") LIKE '%' || LOWER($1) || '%';