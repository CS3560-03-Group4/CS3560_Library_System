INSERT INTO "Book" ("title", "author", "datePublished", "publisher", "genre", "numberOfPages", "description", "imageURL")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;